const cacheName = "greeting-v2"; // Обновили версию, чтобы браузер перекачал все файлы

const files = [
  "./",
  "index.html",
  "manifest.json",
  "sw.js",
  "music.mp3",
  "icon-512.png",
  "bg1.jpg",
  "bg2.jpg",
  "bg3.jpg",
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg"
];

// Установка: сохранение файлов в кэш
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(files))
      .then(() => self.skipWaiting())
  );
});

// Активация: удаление старых кэшей и запуск нового SW
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Перехват запросов (работа оффлайн)
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request)
      .then(response => response || fetch(e.request))
  );
});
