const siic = "SIIC"
const assets = [
  "/",
  "/ai/siic/index.html",
  "/ai/siic/css/leaflet.css",
  "/987654567.png",
  "/ai/siic/css/css-font-awesome.min.css",
  "/ai/siic/css/assets-owl.carousel.min.css",
  "/ai/siic/css/venobox-venobox.css",
  "/ai/siic/css/aos-aos.css",
  "/ai/siic/css/css-style.css",
  "/ai/siic/lef.js",
  "/ai/siic/fonts/fonts-boxicons.eot",
  "/ai/siic/fonts/fonts-boxicons.svg",
  "/ai/siic/fonts/fonts-boxicons.ttf",
  "/ai/siic/fonts/fonts-boxicons.woff",
  "/ai/siic/fonts/fonts-boxicons.woff2",
  "/ai/siic/fonts/fonts-fontawesome-webfont.eot",
  "/ai/siic/fonts/fonts-fontawesome-webfont.svg",
  "/ai/siic/fonts/fonts-fontawesome-webfont.ttf",
  "/ai/siic/fonts/fonts-fontawesome-webfont.woff",
  "/ai/siic/fonts/fonts-fontawesome-webfont.woff2",
  "/ai/siic/fonts/img-preloader.svg",
  "/ai/siic/index.js",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(siic).then(cache => {
      cache.addAll(assets)
    })
  )
})
