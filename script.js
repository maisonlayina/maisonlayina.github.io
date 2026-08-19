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
if(location.pathname.includes('prestations'))addServiceImages();

const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
})();