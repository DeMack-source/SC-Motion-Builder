const CACHE = 'sc-motion-v27';

const ASSETS = [
  './',
  'index.html',
  'app-shell.html',
  'styles.css',
  'app.js?v=1957284-fix-casesummary-groups-crash',
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

  // HTML navigations and the shell: network-first with cache fallback.
  // ignoreSearch matters here: app.js fetches 'app-shell.html?v=<build>' with a
  // build-id query string that changes every release, but the precached entry
  // (from ASSETS) has no query string. Without ignoreSearch, an offline lookup
  // misses the cache entirely and falls through to serving index.html's markup
  // in place of the real app shell.
  const isShellRequest = url.pathname.endsWith('app-shell.html');
  if (e.request.mode === 'navigate' || isShellRequest) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
          return res;
        })
        .catch(async () => {
          const cached = await caches.match(e.request, { ignoreSearch: true });
          if (cached) return cached;
          return isShellRequest
            ? caches.match('app-shell.html')
            : caches.match('index.html');
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

  // Same-origin app assets: cache-first (ignoring query strings - see note
  // above re: versioned ?v= params), network fallback. If neither cache nor
  // network has it, let the request fail rather than substituting index.html's
  // markup for a missing script/stylesheet/data file.
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.match(e.request, { ignoreSearch: true }).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(res => {
          caches.open(CACHE).then(c => c.put(e.request, res.clone()));
          return res;
        });
      })
    );
    return;
  }

  // External requests: network-first, cache fallback
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
