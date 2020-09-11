const static_resources = "statics";
const dynamic_resources = "dynamics";
const assets = [
  "/",
  "/index.html",
  "/js/app.js",
  "/js/ui.js",
  "/css/main.css",
  "/icons/search.svg",
  //TODO : Cache google fonts
];

// install serviceworker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(static_resources).then((cache) => {
      console.log(`Caching your assets`);
      cache.addAll(assets);
    })
  );
  // console.log(`Service worker Installed.`);
});

// activation even
self.addEventListener("activate", (event) => {
  // console.log(`Service worker activated.`);
  event.waitUntil(
    caches.keys().then((keys) => {
      // console.log(keys);
      return Promise.all(
        keys
          .filter((key) => key != static_resources)
          .map((key) => caches.delete(key))
      );
    })
  );
});

//fetch event
self.addEventListener("fetch", (event) => {
  console.log(`Fetch event:`, event);
  event.respondWith(
    caches.match(event.request).then((cache_res) => {
      return (
        cache_res ||
        fetch(event.request).then(async (fetch_res) => {
          const cache = await caches.open(dynamic_resources);
          cache.put(event.request.url, fetch_res.clone());
          return fetch_res;
        })
      );
    })
  );
});
