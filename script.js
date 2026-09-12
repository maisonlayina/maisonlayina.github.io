(function(){
/* Logo officiel */
const wordmark=document.querySelector('.site-header .wordmark');
if(wordmark&&!wordmark.querySelector('.header-logo')){
  wordmark.classList.add('logo-link');
  wordmark.setAttribute('aria-label','LAYINA — Accueil');
  wordmark.innerHTML='<img class="header-logo" src="assets/logo-layina.png" alt="LAYINA — Maison de la transformation">';
}

/* Footer */
const footer=document.querySelector('footer');
if(footer){
  if(!footer.querySelector('.footer-logo')){
    const oldBrand=footer.querySelector('.footer-brand');
    const logoWrap=document.createElement('div');
    logoWrap.className='footer-logo-wrap';
    logoWrap.innerHTML='<img class="footer-logo" src="assets/logo-layina.png" alt="LAYINA — Maison de la transformation">';
    if(oldBrand)oldBrand.replaceWith(logoWrap);else footer.prepend(logoWrap);
  }
  if(!footer.querySelector('.footer-contact-info')){
    const info=document.createElement('div');
    info.className='footer-contact-info';
    info.innerHTML='<p><strong>Cabinet LAYINA</strong><br>5 boulevard Baille, 13006 Marseille</p><p><a href="tel:+33759376523">07 59 37 65 23</a><br><a href="https://www.instagram.com/maison_layina/" target="_blank" rel="noopener">Instagram · @maison_Layina</a></p>';
    const logo=footer.querySelector('.footer-logo-wrap');
    if(logo)logo.insertAdjacentElement('afterend',info);else footer.prepend(info);
  }
}

/* Navigation */
const n=document.querySelector('.site-header nav');
if(n){
  n.innerHTML='<a href="index.html">Accueil</a><a href="conseil-image.html">Conseil en image</a><a href="mariage.html">Spécial Marié(e)</a><a href="index.html#apropos">À propos</a><a href="faq.html">FAQ + Contact</a><a class="nav-cta" href="https://calendly.com/layina_maison" target="_blank" rel="noopener">Réserver</a>';
}
const b=document.querySelector('.menu-button');
if(b&&n){
  b.addEventListener('click',()=>n.classList.toggle('open'));
  n.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>n.classList.remove('open')));
}

/* Contact prestations */
const contactBlock=document.querySelector('.contact');
if(contactBlock&&location.pathname.includes('prestations')){
  contactBlock.innerHTML='<div><p class="eyebrow">Besoin de plus de détails ?</p><h2>Une question avant de réserver ?</h2><p>Si tu hésites entre plusieurs prestations ou si tu souhaites un renseignement complémentaire, n’hésite pas à me joindre au <a href="tel:+33759376523"><strong>07 59 37 65 23</strong></a> ou sur <a href="https://wa.me/33759376523" target="_blank" rel="noopener"><strong>WhatsApp</strong></a>.</p><a class="button secondary" href="faq.html#contact">Me contacter</a></div><div><p class="eyebrow">Réservation</p><h2>Prête à réserver ?</h2><p>Choisis directement ton créneau parmi mes disponibilités en ligne.</p><a class="button primary" href="https://calendly.com/layina_maison" target="_blank" rel="noopener">Voir toutes les disponibilités</a></div>';
}

/* Photo accueil mobile */
const hero=document.querySelector('.hero');
const heroCopy=hero&&hero.querySelector('.hero-copy');
const heroPhotoWrap=hero&&hero.querySelector('.hero-photo-wrap');
const founderLine=heroCopy&&heroCopy.querySelector('.founder-line');
function placeHeroPhoto(){
  if(!hero||!heroCopy||!heroPhotoWrap||!founderLine)return;
  if(window.matchMedia('(max-width:600px)').matches){
    if(heroPhotoWrap.parentElement!==heroCopy||heroPhotoWrap.previousElementSibling!==founderLine)founderLine.insertAdjacentElement('afterend',heroPhotoWrap);
  }else if(heroPhotoWrap.parentElement!==hero)hero.appendChild(heroPhotoWrap);
}
placeHeroPhoto();
window.addEventListener('resize',placeHeroPhoto);

/* Accordéons */
document.querySelectorAll('.accordion-list details').forEach(d=>{
  d.addEventListener('toggle',()=>{
    if(d.open)document.querySelectorAll('.accordion-list details[open]').forEach(o=>{if(o!==d)o.removeAttribute('open')});
  });
});

function addServiceImages(){
  const map=[
    ['Colorimétrie','assets/colorimetrie.jpg'],
    ['Morphologie visage','assets/morphologie-visage.jpg'],
    ['Morphologie silhouette','assets/morphologie-silhouette.jpeg'],
    ['Style & personnalité','assets/style-personnalite.jpg'],
    ['Tri de dressing','assets/tri-dressing.jpeg'],
    ['Accompagnement achats','assets/accompagnement-achats.jpeg'],
    ['Accompagnement prestataire','assets/accompagnement-prestataire.jpeg'],
    ['Maintien & posture','assets/maintien-posture.jpeg'],
    ["Cours d'auto-maquillage",'assets/auto-maquillage.jpg'],
    ['Cours de pose de voile','assets/pose-voile.jpg'],
    ['Home Reset','assets/home-reset.jpg']
  ];
  document.querySelectorAll('.accordion-list details').forEach(d=>{
    const summary=d.querySelector('summary');
    const title=summary&&summary.querySelector('strong');
    if(!summary||!title||summary.querySelector('.service-image'))return;
    const found=map.find(([name])=>title.textContent.trim().startsWith(name));
    if(!found)return;
    const img=document.createElement('img');
    img.className='service-image';
    img.src=found[1];
    img.alt=title.textContent.trim();
    if(title.textContent.includes('Style'))img.classList.add('service-image-style');
    if(title.textContent.includes('Maintien'))img.classList.add('service-image-posture');
    summary.prepend(img);
  });
}

/* Liens Calendly directs */
const serviceBookingLinks=[
  ['Colorimétrie','https://calendly.com/layina_maison/test-de-colorimetrie-1h'],
  ['Morphologie visage','https://calendly.com/layina_maison/morphologie-visage-visagisme-1-h-80'],
  ['Visage & visagisme','https://calendly.com/layina_maison/morphologie-visage-visagisme-1-h-80'],
  ['Morphologie silhouette','https://calendly.com/layina_maison/morphologie-silhouette-1h'],
  ['Style & personnalité','https://calendly.com/layina_maison/analyse-du-style-de-la-personnalite'],
  ['Tri de dressing','https://calendly.com/layina_maison/tri-du-dressing-3h'],
  ['Tri du dressing','https://calendly.com/layina_maison/tri-du-dressing-3h'],
  ['Accompagnement achats','https://calendly.com/layina_maison/accompagnement-achats'],
  ['Accompagnement prestataire','https://calendly.com/layina_maison/accompagnement-prestataires'],
  ['Maintien & posture','https://calendly.com/layina_maison/cours-de-maintien-et-posture'],
  ["Cours d'auto-maquillage",'https://calendly.com/layina_maison/cours-pose-de-voile'],
  ['Cours de pose de voile','https://calendly.com/layina_maison/cours-de-pose-de-voile'],
  ['Home Reset','https://calendly.com/layina_maison/home-reset']
];
function serviceLinkFor(label){
  const found=serviceBookingLinks.find(([name])=>label.trim().startsWith(name));
  return found&&found[1];
}

function addDirectBookingLinks(){
  const bookingStyle=document.createElement('style');
  bookingStyle.textContent='.direct-booking-row{grid-column:1/-1;margin-top:18px;text-align:center}.direct-booking-row .button{display:inline-flex}.men-service-book{display:inline-flex;margin-top:16px;padding:11px 18px;border:1px solid #c49a65;color:#c49a65;text-decoration:none;font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;transition:.2s}.men-service-book:hover{background:#c49a65;color:#111}.men-package>a[data-direct-booking]{display:inline-flex}.package>a[data-direct-booking]{display:inline-flex}';
  document.head.appendChild(bookingStyle);

  /* Femme : formules */
  const femalePackages={
    'Essentiel':'https://calendly.com/layina_maison/formule-signature',
    'Renaissance':'https://calendly.com/layina_maison/formule-renaissance',
    'Transformation complète':'https://calendly.com/layina_maison/formule-transformation-complete'
  };
  document.querySelectorAll('.package').forEach(pkg=>{
    const name=pkg.querySelector('.package-name');
    if(!name)return;
    const url=femalePackages[name.textContent.trim()];
    if(!url)return;
    const link=[...pkg.querySelectorAll('a')].find(a=>/Réserver/i.test(a.textContent));
    if(link){link.href=url;link.target='_blank';link.rel='noopener';link.dataset.directBooking='true';}
  });

  /* Femme : prestations à la carte */
  document.querySelectorAll('.accordion-list details').forEach(d=>{
    const title=d.querySelector('summary strong');
    const content=d.querySelector('.accordion-content');
    if(!title||!content||content.querySelector('.direct-booking-row'))return;
    const url=serviceLinkFor(title.textContent);
    if(!url)return;
    const row=document.createElement('div');
    row.className='direct-booking-row';
    row.innerHTML='<a class="button primary" target="_blank" rel="noopener">Réserver cette prestation</a>';
    row.querySelector('a').href=url;
    content.appendChild(row);
  });

  /* Homme : formules */
  const malePackages={
    'Essentiel':'https://calendly.com/layina_maison/formule-signature',
    'Renaissance':'https://calendly.com/layina_maison/formule-renaissance',
    'Transformation complète':'https://calendly.com/layina_maison/homme-transformation-complete-899'
  };
  document.querySelectorAll('.men-package').forEach(pkg=>{
    const name=pkg.querySelector('h3');
    if(!name)return;
    const url=malePackages[name.textContent.trim()];
    if(!url)return;
    const link=pkg.querySelector('a');
    if(link){link.href=url;link.target='_blank';link.rel='noopener';link.dataset.directBooking='true';}
  });

  /* Homme : prestations à la carte */
  document.querySelectorAll('.men-service-grid article').forEach(card=>{
    const title=card.querySelector('h3');
    if(!title||card.querySelector('.men-service-book'))return;
    const url=serviceLinkFor(title.textContent);
    if(!url)return;
    const link=document.createElement('a');
    link.className='men-service-book';
    link.href=url;
    link.target='_blank';
    link.rel='noopener';
    link.textContent='Réserver cette prestation';
    card.appendChild(link);
  });
}

if(location.pathname.includes('prestations')){
  addServiceImages();
  document.querySelectorAll('.package').forEach(pkg=>{
    const name=pkg.querySelector('.package-name');
    if(!name||!['Renaissance','Transformation complète'].includes(name.textContent.trim()))return;
    const firstList=pkg.querySelector('ul');
    if(!firstList)return;
    const texts=[...firstList.querySelectorAll('li')].map(li=>li.textContent.trim());
    if(!texts.includes('Accompagnement coiffeur')){const li=document.createElement('li');li.textContent='Accompagnement coiffeur';firstList.appendChild(li);}
    if(!texts.includes('Pause déjeuner')){const li=document.createElement('li');li.textContent='Pause déjeuner';firstList.appendChild(li);}
  });
}
addDirectBookingLinks();

/* Hero Mariage */
if(location.pathname.includes('mariage')){
  const mariageHero=document.querySelector('.page-hero');
  if(mariageHero){
    mariageHero.classList.add('mariage-hero-live');
    const style=document.createElement('style');
    style.textContent=`.mariage-hero-live{position:relative!important;isolation:isolate!important;min-height:620px!important;display:flex!important;flex-direction:column!important;align-items:flex-start!important;justify-content:center!important;padding:80px 8vw!important;background-image:linear-gradient(90deg,rgba(25,20,17,.66) 0%,rgba(25,20,17,.43) 42%,rgba(25,20,17,.08) 72%),url('assets/mariage-plage.jpeg?v=002525f57cf7158')!important;background-size:cover!important;background-position:center 52%!important;color:#fff!important;text-align:left!important;overflow:hidden!important}.mariage-hero-live:after{content:'';position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,rgba(0,0,0,.04),rgba(0,0,0,.18))}.mariage-hero-live .eyebrow{color:#d8b36d!important;letter-spacing:.24em!important;text-transform:uppercase!important;margin-bottom:18px!important}.mariage-hero-live h1{max-width:760px!important;color:#fff!important;font-size:clamp(3.4rem,7vw,6.7rem)!important;line-height:.92!important;margin:0 0 24px!important;text-shadow:0 3px 22px rgba(0,0,0,.2)!important}.mariage-hero-live h1 em{color:#fff!important;font-style:normal!important}.mariage-hero-live>p:last-child{max-width:660px!important;color:#fff!important;font-family:'Cormorant Garamond',Georgia,serif!important;font-size:clamp(1.25rem,2vw,1.65rem)!important;line-height:1.45!important;letter-spacing:.02em!important;text-shadow:0 2px 14px rgba(0,0,0,.35)!important}@media(max-width:700px){.mariage-hero-live{min-height:520px!important;padding:58px 24px!important;background-position:58% center!important;background-image:linear-gradient(90deg,rgba(25,20,17,.66),rgba(25,20,17,.22)),url('assets/mariage-plage.jpeg?v=002525f57cf7158')!important}.mariage-hero-live h1{font-size:clamp(2.9rem,14vw,4.5rem)!important;max-width:90%!important}.mariage-hero-live>p:last-child{font-size:1.2rem!important;max-width:88%!important}}`;
    document.head.appendChild(style);
  }
}

const y=document.getElementById('year');
if(y)y.textContent=new Date().getFullYear();
})();