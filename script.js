(function(){
  const fix=document.createElement('link');
  fix.rel='stylesheet';
  fix.href='restore-fixes.css';
  document.head.appendChild(fix);

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

    set('.hero-photo img','hero');
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

  const theme=document.createElement('style');
  theme.textContent=`
    .appointment-strip{
      background:#f5efe6;
      color:#2d2722;
      padding:72px 7vw 78px;
    }
    .appointment-strip .eyebrow{
      color:#a57c3c;
      margin-bottom:34px;
    }
    .appointment-grid{
      max-width:1180px;
      display:grid;
      grid-template-columns:repeat(2,minmax(0,1fr));
      gap:22px;
      border:0;
    }
    .appointment-grid>div{
      position:relative;
      padding:34px 36px 32px;
      background:#fffdfa;
      border:1px solid rgba(165,124,60,.20);
      border-radius:18px;
      box-shadow:0 16px 38px rgba(52,39,24,.07);
    }
    .appointment-grid>div::before{
      content:"";
      display:block;
      width:42px;
      height:2px;
      margin-bottom:20px;
      background:#c3a062;
    }
    .appointment-grid span,
    .method-grid span,
    .service-number{
      display:none!important;
    }
    .appointment-grid strong{
      color:#2d2722;
      font-size:1.75rem;
      margin:0 0 7px;
      font-weight:500;
    }
    .appointment-grid p{
      color:#756b62;
      font-size:.94rem;
      line-height:1.8;
    }
    .method-grid{
      max-width:1120px;
      display:grid;
      grid-template-columns:repeat(2,minmax(0,1fr));
      gap:20px;
      border:0;
    }
    .method-grid>div{
      padding:32px 34px;
      border:1px solid rgba(165,124,60,.20)!important;
      border-radius:16px;
      background:#fbf8f3;
    }
    .method-grid h3{
      color:#a57c3c;
      font-size:1.9rem;
      margin:0 0 8px;
      font-weight:500;
    }
    .method-grid p{
      font-size:.94rem;
      line-height:1.8;
    }
    @media(max-width:700px){
      .appointment-grid,.method-grid{grid-template-columns:1fr;}
      .appointment-grid>div,.method-grid>div{padding:28px 25px;}
      .appointment-strip{padding:58px 20px 64px;}
    }
  `;
  document.head.appendChild(theme);

  const menuButton=document.querySelector('.menu-button');
  const nav=document.querySelector('.site-header nav');
  if(menuButton&&nav) menuButton.addEventListener('click',()=>nav.classList.toggle('open'));
  document.querySelectorAll('.site-header nav a').forEach(a=>a.addEventListener('click',()=>nav&&nav.classList.remove('open')));

  const year=document.getElementById('year');
  if(year) year.textContent=new Date().getFullYear();
})();
