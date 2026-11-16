// Mis Cuentas — service worker: funciona sin internet.
// Al publicar cambios, subí VERSION para que el celu baje los archivos nuevos.
const VERSION = "mc-1.3.1";
const CORE = ["./", "index.html", "manifest.json", "icon-180.png", "icon-192.png", "icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  // Página: primero la red (para tener la última versión), si no hay internet, la guardada
  if (req.mode === "navigate") {
    e.respondWith(fetch(req.url, { cache: "no-store" }).then(r => { const cp = r.clone(); caches.open(VERSION).then(c => c.put("index.html", cp)); return r; })
      .catch(() => caches.match("index.html")));
    return;
  }
  if (new URL(req.url).pathname.endsWith("version.json")) return;
  // Resto (íconos, fuentes): lo guardado primero
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
    if (r.ok || r.type === "opaque") { const cp = r.clone(); caches.open(VERSION).then(c => c.put(req, cp)); }
    return r;
  })));
});
