const CACHE_NAME = "mardial-pwa";
let urlsToCache = [
  "/",
  "/index.html",
  "/nav.html",
  "/pages/home.html",
  "/pages/biography.html",
  "/pages/contact.html",
  "/pages/album.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/album.js",
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request, { cacheName: CACHE_NAME }).then(response => {
      if (response) {
        console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
        return response;
      }

      console.log(
        "ServiceWorker: Memuat aset dari server: ",
        event.request.url
      );
      return fetch(event.request);
    })
  );
});

self.addEventListener("active", event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName != CACHE_NAME) {
            console.log(`ServiceWorker : cahce ${cacheName} dihapus`);
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
