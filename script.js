(function(){
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

function loadScript(src){return new Promise((resolve)=>{if(document.querySelector('script[data-layina-src="'+src+'"]')){resolve();return}const s=document.createElement('script');s.src=src;s.dataset.layinaSrc=src;s.onload=resolve;s.onerror=resolve;document.head.appendChild(s)})}
function addServiceImages(){
  const v=window.LAYINA_V2||{};
  const li=window.LAYINA_IMAGES||{};
  const map=[
    ['Colorimétrie',v.color],
    ['Morphologie visage',v.morpho],
    ['Morphologie silhouette',li['morphologie-silhouette.jpg']],
    ['Style & personnalité',v.style],
    ['Tri de dressing','assets/tri-dressing.jpg'],
    ['Accompagnement achats',v.achats||'assets/accompagnement-achats.jpg'],
    ['Accompagnement prestataire',v.prestataire||'assets/accompagnement-prestataire.jpg'],
    ['Maintien & posture',v.homme],
    ["Cours d'auto-maquillage",'assets/auto-maquillage-originale-floutee.jpg'],
    ['Cours de pose de voile','assets/style-personnalite.jpg'],
    ['Home Reset',v.home||'assets/home-reset.jpg']
  ];
  document.querySelectorAll('.accordion-list details').forEach((d)=>{
    const summary=d.querySelector('summary');
    const title=summary&&summary.querySelector('strong');
    if(!summary||!title||summary.querySelector('.service-image'))return;
    const found=map.find(([name])=>title.textContent.trim().startsWith(name));
    if(!found||!found[1])return;
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
  Promise.all([
    loadScript('v2-color.js'),
    loadScript('v2-morpho.js'),
    loadScript('img-morphologie-silhouette.js'),
    loadScript('v2-style.js'),
    loadScript('v2-achats.js'),
    loadScript('v2-prestataire.js'),
    loadScript('v2-homme.js'),
    loadScript('v2-home.js')
  ]).then(addServiceImages);
}
const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
})();