const siic = "SIIC"
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
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(siic).then(cache => {
      cache.addAll(assets)
    })
  )
})
