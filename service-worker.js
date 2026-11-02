/* Frog Spelling LITE v1.6: cache PUBLIC immutable character artwork only. */
const IMAGE_CACHE='frog-lite-portraits-v1.6';
const PRELOAD=[
  "assets/orbit-thumb.webp",
  "assets/captain-thumb.webp",
  "assets/merlin-thumb.webp",
  "assets/valor-thumb.webp",
  "assets/sherlock-thumb.webp",
  "assets/sizzle-thumb.webp",
  "assets/harvest-thumb.webp",
  "assets/blossom-thumb.webp",
  "assets/palette-thumb.webp",
  "assets/strum-thumb.webp",
  "assets/hoops-thumb.webp",
  "assets/scholar-thumb.webp",
  "assets/shadow-thumb.webp",
  "assets/katana-thumb.webp",
  "assets/ragnar-thumb.webp",
  "assets/royal-thumb.webp",
  "assets/petal-thumb.webp",
  "assets/honey-thumb.webp",
  "assets/frost-thumb.webp",
  "assets/bubbles-thumb.webp",
  "assets/scout-thumb.webp",
  "assets/cosmo-thumb.webp",
  "assets/riff-thumb.webp",
  "assets/sunny-thumb.webp",
  "assets/tinker-thumb.webp",
  "assets/beaker-thumb.webp",
  "assets/doc-thumb.webp",
  "assets/ember-thumb.webp",
  "assets/ace-thumb.webp",
  "assets/dusty-thumb.webp",
  "assets/hop-ready.webp",
  "assets/hop-jump.png",
  "assets/hop-land.png",
  "assets/teacher-frog.webp"
];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(IMAGE_CACHE).then(cache=>Promise.allSettled(PRELOAD.map(url=>cache.add(url)))).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(x=>x.startsWith('frog-lite-portraits-')&&x!==IMAGE_CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET')return;
  const u=new URL(req.url);
  if(u.origin!==self.location.origin || !u.pathname.includes('/assets/') || !/\.(webp|png)$/.test(u.pathname))return;
  event.respondWith(caches.open(IMAGE_CACHE).then(async cache=>{
     const cached=await cache.match(req);
     if(cached)return cached;
     const response=await fetch(req);
     if(response.ok)cache.put(req,response.clone());
     return response;
  }));
});
