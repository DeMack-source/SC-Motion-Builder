const CACHE = 'sc-motion-v6';

const ASSETS = [
  './',
  'index.html',
  'app-shell.html',
  'styles.css',
  'app.js?v=3351717',
  'charges.js',
  'icon.svg',
  'motion-manifest.json',
  'fl-motion-builder.html',
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap'
];

// INSTALL - cache all core assets
self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(ASSETS);

    // Cache Google Font files referenced inside the CSS
    try {
      const fontCss = await fetch(
        'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap'
      );
      const cssText = await fontCss.text();
      const fontUrls = cssText.match(/https:\/\/fonts\.gstatic\.com\/[^)]+/g) || [];
      await Promise.allSettled(fontUrls.map(url => cache.add(url)));
    } catch (_) {
      // Font caching is best-effort - don't block install
    }

    self.skipWaiting();
  })());
});

// ACTIVATE - delete old cache versions
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// FETCH - tiered strategy by request type
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // HTML navigations and the shell: network-first with cache fallback
  if (e.request.mode === 'navigate' || url.pathname.endsWith('app-shell.html')) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
          return res;
        })
        .catch(async () => {
          const cached = await caches.match(e.request);
          return cached || caches.match('index.html');
        })
    );
    return;
  }

  // Google Fonts: cache-first (fonts don't change often)
  if (
    url.origin === 'https://fonts.googleapis.com' ||
    url.origin === 'https://fonts.gstatic.com'
  ) {
    e.respondWith(
      caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
        caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        return res;
      }))
    );
    return;
  }

  // Same-origin app assets: cache-first, network fallback
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(res => {
          caches.open(CACHE).then(c => c.put(e.request, res.clone()));
          return res;
        }).catch(() => caches.match('index.html'));
      })
    );
    return;
  }

  // External requests: network-first, cache fallback
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
