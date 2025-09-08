const CACHE_NAME = 'ecommerce-marketplace-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

// Install event
self.addEventListener('install', event => {
  console.log('[SW] Installing Service Worker');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching App Shell');
        return cache.addAll(urlsToCache).catch(err => {
          console.log('[SW] Some files failed to cache');
          return Promise.resolve();
        });
      })
      .catch(err => {
        console.log('[SW] Error caching files:', err);
      })
  );
});

// Activate event
self.addEventListener('activate', event => {
  console.log('[SW] Activating Service Worker');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
  );
});

// Fetch event - Network First strategy for API calls, Cache First for static assets
self.addEventListener('fetch', event => {
  if (event.request.url.includes('/api/')) {
    // Network First strategy for API calls
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
  } else {
    // Cache First strategy for static assets
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          return response || fetch(event.request);
        })
        .catch(() => {
          if (event.request.destination === 'document') {
            return caches.match('/');
          }
        })
    );
  }
});

// Background Sync for cart updates
self.addEventListener('sync', event => {
  if (event.tag === 'cart-sync') {
    console.log('[SW] Background sync: cart-sync');
    event.waitUntil(syncCartUpdates());
  }
});

async function syncCartUpdates() {
  try {
    console.log('[SW] Syncing cart updates...');
    // In a real app, this would sync with your backend
  } catch (err) {
    console.log('[SW] Background sync failed:', err);
  }
}

// Push notification handling
self.addEventListener('push', event => {
  console.log('[SW] Push Received.');
  
  let notificationTitle = 'Marketplace Notification';
  let notificationOptions = {
    body: 'You have a new notification!',
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: { dateOfArrival: Date.now() },
    actions: [
      { action: 'explore', title: 'Go to the site' },
      { action: 'close', title: 'Close notification' }
    ]
  };

  if (event.data) {
    const data = event.data.json();
    notificationTitle = data.title || notificationTitle;
    notificationOptions.body = data.body || notificationOptions.body;
  }

  event.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
  console.log('[SW] Notification click Received.');
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(clients.openWindow('/'));
  } else if (event.action === 'close') {
    event.notification.close();
  } else {
    event.waitUntil(clients.openWindow('/'));
  }
});