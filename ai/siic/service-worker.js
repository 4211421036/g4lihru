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

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil((async() => {
        const cache = await caches.open(siic);
        console.log('[Service Worker] Caching all: app shell and content');
        await cache.addAll(assets);
    })());
});

// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {
    e.respondWith((async() => {
        const r = await caches.match(e.request);
        console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
        if (r) return r;
        const response = await fetch(e.request);
        const cache = await caches.open(siic);
        console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
        cache.put(e.request, response.clone());
        return response;
    })());
});
