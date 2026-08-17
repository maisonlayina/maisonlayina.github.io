(function(){
  const brandFix=document.createElement('style');
  brandFix.textContent=`
    /* Uniquement les deux éléments demandés : logo visible + photo d'accueil nette */
    .header-logo{background:#fff!important;padding:10px 16px!important;border-radius:12px!important;box-shadow:0 6px 22px rgba(0,0,0,.10)!important}
    .header-logo img{display:block!important;width:285px!important;height:88px!important;object-fit:contain!important;opacity:1!important;visibility:visible!important}
    .hero-copy::before{content:"";display:block;width:230px;height:145px;margin:0 0 10px;background:url('assets/logo-layina.png') left center/contain no-repeat;opacity:1}
    .hero-photo{display:block!important;max-width:220px!important;padding:8px!important;background:#fff!important}
    .hero-photo img{display:block!important;width:100%!important;height:auto!important;object-fit:contain!important;filter:none!important;opacity:1!important;image-rendering:auto!important}
    @media(max-width:900px){.hero-copy::before{width:200px;height:125px}.hero-photo{max-width:210px!important}}
    @media(max-width:600px){.header-logo img{width:205px!important;height:68px!important}.hero-copy::before{width:175px;height:110px}.hero-photo{max-width:195px!important}}
  `;
  document.head.appendChild(brandFix);

  const menuButton=document.querySelector('.menu-button');
  const nav=document.querySelector('.site-header nav');
  if(menuButton&&nav){
    menuButton.addEventListener('click',()=>nav.classList.toggle('open'));
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
  }
  const year=document.getElementById('year');
  if(year) year.textContent=new Date().getFullYear();
})();