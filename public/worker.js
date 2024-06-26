const CACHE_NAME = 'pwa-notification-cache';
const version = '0.0.1';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(['/offline.html', '/offline.css']);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (CACHE_NAME !== cacheName && cacheName.startsWith('cache')) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  if (
    event.request.mode === 'navigate' ||
    (event.request.method === 'GET' &&
      event.request.headers.get('accept').includes('text/html'))
  ) {
    event.respondWith(
      fetch(event.request.url).catch(() => {
        return caches.match('offline.html');
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  }
});

self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
