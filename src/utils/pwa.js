// Service Worker registration and PWA utilities

export const registerSW = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });
      
      console.log('SW registered: ', registration);
      
      // Listen for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available
              showUpdateNotification();
            }
          });
        }
      });
      
      return registration;
    } catch (error) {
      console.error('SW registration failed: ', error);
      return null;
    }
  }
  return null;
};

export const unregisterSW = async () => {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      return registration.unregister();
    }
  }
  return false;
};

// Background sync for cart updates
export const requestCartSync = async () => {
  if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
    const registration = await navigator.serviceWorker.ready;
    return registration.sync.register('cart-sync');
  }
};

// Push notifications
export const requestNotificationPermission = async () => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return false;
};

// PWA installation
export const showInstallPromotion = () => {
  let deferredPrompt;
  
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    
    // Show install banner
    showInstallBanner(() => {
      // User clicked install
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
    });
  });
  
  window.addEventListener('appinstalled', (evt) => {
    console.log('App was installed');
    hideInstallBanner();
  });
};

// Check if app is running in standalone mode (PWA)
export const isRunningStandalone = () => {
  return window.matchMedia && 
         window.matchMedia('(display-mode: standalone)').matches ||
         window.navigator.standalone === true;
};

// Offline detection
export const setupOfflineDetection = (onOnline, onOffline) => {
  window.addEventListener('online', onOnline);
  window.addEventListener('offline', onOffline);
  
  return () => {
    window.removeEventListener('online', onOnline);
    window.removeEventListener('offline', onOffline);
  };
};

// Cache management
export const clearCache = async () => {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    return Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    );
  }
};

// Helper functions
const showUpdateNotification = () => {
  // Show a toast or banner that new content is available
  const event = new CustomEvent('sw-update-available');
  window.dispatchEvent(event);
};

const showInstallBanner = (onInstall) => {
  // Show install banner - would create a banner component in real app
  const event = new CustomEvent('show-install-banner', { detail: { onInstall } });
  window.dispatchEvent(event);
};

const hideInstallBanner = () => {
  const event = new CustomEvent('hide-install-banner');
  window.dispatchEvent(event);
};