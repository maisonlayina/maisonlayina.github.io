const CACHE='layina-espace-client-v5';
const ASSETS=['./','index.html','styles.css','app.js','catalogue-fixe.js','manifest.webmanifest','../assets/logo-layina.png'];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);

  if(url.origin===self.location.origin && url.pathname.endsWith('/espace-client/app.js')){
    event.respondWith(Promise.all([
      fetch(event.request),
      fetch(new URL('catalogue-fixe.js',self.location.href))
    ]).then(async([base,extra])=>{
      const merged=(await base.text())+'\n\n'+(await extra.text());
      return new Response(merged,{status:200,headers:{'Content-Type':'application/javascript; charset=utf-8','Cache-Control':'no-cache'}});
    }).catch(()=>caches.match(event.request)));
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{
      const copy=response.clone();
      caches.open(CACHE).then(cache=>cache.put(event.request,copy));
      return response;
    }).catch(()=>caches.match('./')))
  );
});