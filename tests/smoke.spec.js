// Smoke tests for the parts of the app that have broken silently in
// production before: app boot, charge search, and quick search.
// These exist specifically to catch the class of bug (init-timing,
// undeclared globals, stale caching) that previously shipped unnoticed.
const { test, expect } = require('@playwright/test');

function collectPageErrors(page) {
  const errors = [];
  page.on('pageerror', (err) => errors.push(err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  return errors;
}

test('app boots without uncaught errors', async ({ page }) => {
  const errors = collectPageErrors(page);
  await page.goto('/');
  await expect(page.locator('#tab-builder')).toBeVisible();
  await page.waitForTimeout(500);
  expect(errors, errors.join('\n')).toEqual([]);
});

test('charge search returns results for a known charge', async ({ page }) => {
  const errors = collectPageErrors(page);
  await page.goto('/');
  await page.fill('#charge-search', 'murder');
  await expect(page.locator('#charge-ac.open')).toBeVisible();
  await expect(page.locator('#charge-ac .charge-ac-item').first()).toBeVisible();
  expect(errors, errors.join('\n')).toEqual([]);
});

test('charge search shows a no-results state for nonsense input', async ({ page }) => {
  await page.goto('/');
  await page.fill('#charge-search', 'zzzznotarealcharge');
  await expect(page.locator('#charge-ac .ac-no-results')).toBeVisible();
});

test('quick search returns results for a legal term', async ({ page }) => {
  const errors = collectPageErrors(page);
  await page.goto('/');
  await page.fill('#quick-search', 'habeas');
  await expect(page.locator('#qs-results.open')).toBeVisible();
  expect(errors, errors.join('\n')).toEqual([]);
});
