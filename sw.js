const cacheName = "greeting-v1";

const files = [
  "./",
  "index.html",
  "manifest.json",
  "sw.js",
  "music.mp3",
  "bg1.jpg",
  "bg2.jpg",
  "bg3.jpg",
  "icon-512.png"
];

// Установка: сохранение файлов в кэш
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(files))
      .then(() => self.skipWaiting())
  );
});

// Активация
self.addEventListener("activate", e => {
  e.waitUntil(self.clients.claim());
});

// Перехват запросов (работа оффлайн)
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request)
      .then(response => response || fetch(e.request))
  );
});