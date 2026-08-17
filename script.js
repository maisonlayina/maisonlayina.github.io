(function(){
  const fallbackScripts = [
    'img-colorimetrie-originale.js',
    'img-morphologie-silhouette.js',
    'img-maintien-posture.js'
  ];

  const selectedImageScripts = [
    'v2-hero.js',
    'v2-color.js',
    'v2-style.js',
    'v2-morpho.js',
    'v2-achats.js',
    'v2-prestataire.js',
    'v2-homme.js',
    'v2-home.js'
  ];

  function loadScripts(list){
    return Promise.all(list.map(src=>new Promise((resolve,reject)=>{
      const s=document.createElement('script');
      s.src=src;
      s.onload=resolve;
      s.onerror=reject;
      document.head.appendChild(s);
    })));
  }

  function applyFallbackImages(){
    document.querySelectorAll('img[src^="assets/"]').forEach(img=>{
      const name=(img.getAttribute('src')||'').split('/').pop();
      if(window.LAYINA_IMAGES && window.LAYINA_IMAGES[name]) img.src=window.LAYINA_IMAGES[name];
    });
  }

  function applySelectedImages(){
    const I=window.LAYINA_V2||{};
    const set=(selector,key)=>{
      if(!I[key]) return;
      document.querySelectorAll(selector).forEach(img=>{ img.src=I[key]; });
    };

    // Photo d'accueil choisie par Mélissa : affichée telle quelle, sans filtre ni retouche.
    set('.hero-photo img','hero');

    // Prestations : sélection visuelle finale.
    set('.services-list .service-row:nth-child(1) img','color');
    set('.services-list .service-row:nth-child(3) img','morpho');
    set('.services-list .service-row:nth-child(4) img','style');
    set('.services-list .service-row:nth-child(6) img','achats');
    set('.services-list .service-row:nth-child(7) img','prestataire');
    set('.services-list .service-row:nth-child(8) img','homme');
    set('.services-list .service-row:nth-child(11) img','home');
  }

  Promise.allSettled([
    loadScripts(fallbackScripts),
    loadScripts(selectedImageScripts)
  ]).then(()=>{
    applyFallbackImages();
    applySelectedImages();
  });

  document.querySelectorAll('img[src^="assets/"]').forEach(img=>img.addEventListener('error',()=>{
    applyFallbackImages();
    applySelectedImages();
  }));

  const menuButton=document.querySelector('.menu-button');
  const nav=document.querySelector('.site-header nav');
  if(menuButton&&nav) menuButton.addEventListener('click',()=>nav.classList.toggle('open'));
  document.querySelectorAll('.site-header nav a').forEach(a=>a.addEventListener('click',()=>nav&&nav.classList.remove('open')));

  document.querySelectorAll('.details-button').forEach(button=>button.addEventListener('click',()=>{
    const details=button.nextElementSibling;
    details.hidden=!details.hidden;
    button.setAttribute('aria-expanded',String(!details.hidden));
    button.textContent=details.hidden?'En savoir plus':'Réduire';
  }));

  const year=document.getElementById('year');
  if(year) year.textContent=new Date().getFullYear();
})();
