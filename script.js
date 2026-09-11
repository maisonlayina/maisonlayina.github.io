(function(){
/* Uniformise le logo du haut et du bas sur toutes les pages */
const wordmark=document.querySelector('.site-header .wordmark');
if(wordmark&&!wordmark.querySelector('.header-logo')){
  wordmark.classList.add('logo-link');
  wordmark.setAttribute('aria-label','LAYINA — Accueil');
  wordmark.innerHTML='<img class="header-logo" src="assets/logo-layina.png" alt="LAYINA — Maison de la transformation">';
}
const footer=document.querySelector('footer');
if(footer&&!footer.querySelector('.footer-logo')){
  const oldBrand=footer.querySelector('.footer-brand');
  const logoWrap=document.createElement('div');
  logoWrap.className='footer-logo-wrap';
  logoWrap.innerHTML='<img class="footer-logo" src="assets/logo-layina.png" alt="LAYINA — Maison de la transformation">';
  if(oldBrand)oldBrand.replaceWith(logoWrap);else footer.prepend(logoWrap);
}

const n=document.querySelector('.site-header nav');
if(n){
  const cta=n.querySelector('.nav-cta');
  if(!n.querySelector('a[href="faq.html"]')){const faq=document.createElement('a');faq.href='faq.html';faq.textContent='FAQ';n.insertBefore(faq,cta)}
  if(!n.querySelector('a[href="faq.html#contact"]')&&!n.querySelector('a[href="#contact"]')){const contact=document.createElement('a');contact.href='faq.html#contact';contact.textContent='Contact';n.insertBefore(contact,cta)}
}
const contactBlock=document.querySelector('.contact');
if(contactBlock&&location.pathname.includes('prestations')){
  contactBlock.innerHTML='<div><p class="eyebrow">Besoin de plus de détails ?</p><h2>Une question avant de réserver ?</h2><p>Si tu hésites entre plusieurs prestations ou si tu souhaites un renseignement complémentaire, n’hésite pas à me joindre au <a href="tel:+33759376523"><strong>07 59 37 65 23</strong></a> ou sur <a href="https://wa.me/33759376523" target="_blank" rel="noopener"><strong>WhatsApp</strong></a>.</p><a class="button secondary" href="faq.html#contact">Me contacter</a></div><div><p class="eyebrow">Réservation</p><h2>Prête à réserver ?</h2><p>Choisis directement ton créneau parmi mes disponibilités en ligne.</p><a class="button primary" href="https://calendly.com/layina_maison" target="_blank" rel="noopener">Réserver directement</a></div>';
}
const b=document.querySelector('.menu-button');
if(b&&n){b.addEventListener('click',()=>n.classList.toggle('open'));n.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>n.classList.remove('open')))}

/* Une seule photo d'accueil : à droite sur ordinateur, sous le nom sur téléphone */
const hero=document.querySelector('.hero');
const heroCopy=hero&&hero.querySelector('.hero-copy');
const heroPhotoWrap=hero&&hero.querySelector('.hero-photo-wrap');
const founderLine=heroCopy&&heroCopy.querySelector('.founder-line');
function placeHeroPhoto(){
  if(!hero||!heroCopy||!heroPhotoWrap||!founderLine)return;
  if(window.matchMedia('(max-width:600px)').matches){
    if(heroPhotoWrap.parentElement!==heroCopy||heroPhotoWrap.previousElementSibling!==founderLine){
      founderLine.insertAdjacentElement('afterend',heroPhotoWrap);
    }
  }else if(heroPhotoWrap.parentElement!==hero){
    hero.appendChild(heroPhotoWrap);
  }
}
placeHeroPhoto();
window.addEventListener('resize',placeHeroPhoto);

document.querySelectorAll('.accordion-list details').forEach(d=>{d.addEventListener('toggle',()=>{if(d.open){document.querySelectorAll('.accordion-list details[open]').forEach(o=>{if(o!==d)o.removeAttribute('open')})}})});

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
  document.querySelectorAll('.accordion-list details').forEach((d)=>{
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
if(location.pathname.includes('prestations')){
  addServiceImages();
  document.querySelectorAll('.package').forEach(pkg=>{
    const name=pkg.querySelector('.package-name');
    if(!name||!['Renaissance','Transformation complète'].includes(name.textContent.trim()))return;
    const firstList=pkg.querySelector('ul');
    if(!firstList)return;
    const texts=[...firstList.querySelectorAll('li')].map(li=>li.textContent.trim());
    if(!texts.includes('Accompagnement coiffeur')){
      const li=document.createElement('li');li.textContent='Accompagnement coiffeur';firstList.appendChild(li);
    }
    if(!texts.includes('Pause déjeuner')){
      const li=document.createElement('li');li.textContent='Pause déjeuner';firstList.appendChild(li);
    }
  });
}

/* Couverture photo uniquement sur la page Spécial Marié(e) */
if(location.pathname.includes('mariage')){
  const mariageHero=document.querySelector('.page-hero');
  if(mariageHero){
    mariageHero.classList.add('mariage-hero-live');
    const style=document.createElement('style');
    style.textContent=`
      .mariage-hero-live{position:relative!important;isolation:isolate!important;min-height:620px!important;display:flex!important;flex-direction:column!important;align-items:flex-start!important;justify-content:center!important;padding:80px 8vw!important;background-image:linear-gradient(90deg,rgba(25,20,17,.66) 0%,rgba(25,20,17,.43) 42%,rgba(25,20,17,.08) 72%),url('assets/mariage-plage.jpeg?v=002525f57cf7158')!important;background-size:cover!important;background-position:center 52%!important;color:#fff!important;text-align:left!important;overflow:hidden!important}
      .mariage-hero-live:after{content:'';position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,rgba(0,0,0,.04),rgba(0,0,0,.18))}
      .mariage-hero-live .eyebrow{color:#d8b36d!important;letter-spacing:.24em!important;text-transform:uppercase!important;margin-bottom:18px!important}
      .mariage-hero-live h1{max-width:760px!important;color:#fff!important;font-size:clamp(3.4rem,7vw,6.7rem)!important;line-height:.92!important;margin:0 0 24px!important;text-shadow:0 3px 22px rgba(0,0,0,.2)!important}
      .mariage-hero-live h1 em{color:#fff!important;font-style:normal!important}
      .mariage-hero-live>p:last-child{max-width:660px!important;color:#fff!important;font-family:'Cormorant Garamond',Georgia,serif!important;font-size:clamp(1.25rem,2vw,1.65rem)!important;line-height:1.45!important;letter-spacing:.02em!important;text-shadow:0 2px 14px rgba(0,0,0,.35)!important}
      @media(max-width:700px){.mariage-hero-live{min-height:520px!important;padding:58px 24px!important;background-position:58% center!important;background-image:linear-gradient(90deg,rgba(25,20,17,.66),rgba(25,20,17,.22)),url('assets/mariage-plage.jpeg?v=002525f57cf7158')!important}.mariage-hero-live h1{font-size:clamp(2.9rem,14vw,4.5rem)!important;max-width:90%!important}.mariage-hero-live>p:last-child{font-size:1.2rem!important;max-width:88%!important}}
    `;
    document.head.appendChild(style);
  }
}

const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
})();