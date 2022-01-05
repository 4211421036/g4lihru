
this.addEventListener('install', e => {
    e.waitUntil(
        caches.open("static").then(cahce => {
            return cahce.addAll([
                "./Home.html",
                "./987654567.png",
                "https://g4lihriu.web.app/defualt.js",
                "https://g4lihru.me/345678987.css",
                "./css/style.css",
                "./img/banner/banner-bg.png",
                "./img/banner/hero-banner.png",
                "./img/blog/cat-post/cat-post-1.jpg",
                "./img/blog/cat-post/cat-post-2.jpg",
                "./img/blog/cat-post/cat-post-3.jpg",
                "./img/blog/causes/causes-1.jpg",
                "./img/blog/causes/causes-1.jpg",
                "./img/blog/causes/causes-3.jpg",
                "./img/blog/latest-post/l-post-1.jpg",
                "./img/blog/latest-post/l-post-2.jpg",
                "./img/blog/latest-post/l-post-3.jpg",
                "./img/blog/latest-post/l-post-4.jpg",
                "./img/blog/main-blog/m-blog-1.jpg",
                "./img/blog/main-blog/m-blog-2.jpg",
                "./img/blog/main-blog/m-blog-3.jpg",
                "./img/blog/main-blog/m-blog-4.jpg",
                "./img/blog/main-blog/m-blog-5.jpg",
                "./img/blog/popular-post/post-1.jpg",
                "./img/blog/popular-post/post-2.jpg",
                "./img/blog/popular-post/post-3.jpg",
                "./img/blog/popular-post/post-4.jpg",
                "./img/logo.jpg",
                "./img/120px-YouTube_full-color_icon_(2017).svg.png",
                "./img/backgroung.png",
                "./img/bubble.png",
                "./img/Fevicon.png",
                "./img/Fevicon.jpg",
                "./img/ico.png",
                "./img/output-onlinejpgtools (1).png",
                "./img/SIGMA.svg"
            ])
        })
    )
});

self.addEventListener("fetch", e => {
    e.respondWith(
        cahces.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    )
});
