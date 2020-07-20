const cache_name = "pwakedua-v37";
// asset utk ditaruh di cache storage
const urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/match.html",
  "/pages/saved.html",
  "/pages/standings.html",
  "/pages/teams.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/activatesw.js",
  "/js/activateswTeam.js",
  "/css/style.css",
  "/css/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
  "/manifest.json",
  "/img/icon-128x128.png",
  "/img/icon-144x144.png",
  "/img/icon-152x152.png",
  "/img/icon-192x192.png",
  "/img/icon-384x384.png",
  "/img/icon-512x512.png",
  "/img/icon-72x72.png",
  "/img/icon-96x96.png",
  "/css/Acme-Regular.ttf",
  "/js/api.js",
  "/team.html",
  "/js/idb.js",
  "/js/db.js",
];

// utk menyimpan/menambahkan cache di cache storage
self.addEventListener("install", function (event) {
  console.log("serviceworker: menginstall..");
  event.waitUntil(
    caches.open(cache_name).then(function (cache) {
      console.log("serviceworker:membuka cache..");
      return cache.addAll(urlsToCache);
    })
  );
});

// utk menggunakan cache yg di cache storage
self.addEventListener("fetch", function (event) {
  const base_url = "https://api.football-data.org/v2/";

  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(cache_name).then(function (cache) {
        return fetch(event.request).then(function (response) {
          cache.put(event.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    event.respondWith(
      caches
        .match(event.request, { ignoreSearch: true })
        .then(function (response) {
          return response || fetch(event.request);
        })
    );
  }
});

// utk menghapus cache lama agar tdk membebani pengguna
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != cache_name) {
            console.log(`serviceworker : cache ${cacheName} dihapus`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

//! event/blok push
self.addEventListener("push", function (event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "push message no payload";
  }
  const options = {
    body: body,
    icon: "/img/icon-512x512.webp",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification("push notification", options)
  );
});
