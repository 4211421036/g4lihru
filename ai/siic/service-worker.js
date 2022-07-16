const siic = "SIIC";
const assets = [
  "/",
  "/index.html",
  "/css/leaflet.css",
  "/css-font-awesome.min.css",
  "/css/assets-owl.carousel.min.css",
  "/css/venobox-venobox.css",
  "/css/aos-aos.css",
  "/css/css-style.css",
  "/lef.js",
  "/fonts/fonts-boxicons.eot",
  "/fonts/fonts-boxicons.svg",
  "/fonts/fonts-boxicons.ttf",
  "/fonts/fonts-boxicons.woff",
  "/fonts/fonts-boxicons.woff2",
  "/fonts/fonts-fontawesome-webfont.eot",
  "/fonts/fonts-fontawesome-webfont.svg",
  "/fonts/fonts-fontawesome-webfont.ttf",
  "/fonts/fonts-fontawesome-webfont.woff",
  "/fonts/fonts-fontawesome-webfont.woff2",
  "/fonts/img-preloader.svg",
  "/index.js",
];

self.addEventListener('install', function(event) {
  console.log('[ServiceWorker] Install');
  
  event.waitUntil((async () => {
    const cache = await caches.open(siic);
    // Setting {cache: 'reload'} in the new request will ensure that the response
    // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
    await cache.add(new Request(assets, {cache: 'reload'}));
  })());
  
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil((async () => {
    // Enable navigation preload if it's supported.
    // See https://developers.google.com/web/updates/2017/02/navigation-preload
    if ('navigationPreload' in self.registration) {
      await self.registration.navigationPreload.enable();
    }
  })());

  // Tell the active service worker to take control of the page immediately.
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  // console.log('[Service Worker] Fetch', event.request.url);
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResponse = await event.preloadResponse;
        if (preloadResponse) {
          return preloadResponse;
        }

        const networkResponse = await fetch(event.request);
        return networkResponse;
      } catch (error) {
        console.log('[Service Worker] Fetch failed; returning offline page instead.', error);

        const cache = await caches.open(siic);
        const cachedResponse = await cache.match(assets);
        return cachedResponse;
      }
    })());
  }
});
