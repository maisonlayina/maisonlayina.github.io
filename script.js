(function(){
  const visualFix=document.createElement('style');
  visualFix.textContent=`
    .service-row img,.service-visual{display:none!important}
    .service-row,.service-row.reverse{display:block!important;min-height:0!important;max-width:900px!important;margin:0 auto!important;width:100%!important}
    .service-row__content{padding:34px 42px!important}
    .hero{grid-template-columns:1.08fr .92fr!important;min-height:76vh!important}
    .hero-copy{max-width:760px!important;margin:0!important}
    .hero-photo{display:block!important;max-width:330px!important;margin:0 auto!important}
    .hero-photo img{display:block!important;width:100%!important;height:auto!important;object-fit:contain!important}
    .header-logo img{width:245px!important;height:88px!important;object-fit:contain!important}
    .hero:before{opacity:.16!important}
    @media(max-width:900px){.hero{grid-template-columns:1fr!important}.hero-photo{max-width:290px!important}.header-logo img{width:220px!important;height:82px!important}}
    @media(max-width:600px){.header-logo img{width:185px!important;height:72px!important}.hero-photo{max-width:245px!important}.service-row__content{padding:26px 22px!important}}
  `;
  document.head.appendChild(visualFix);

  const heroScript=document.createElement('script');
  heroScript.src='v2-hero.js?v=20260817b';
  heroScript.onload=()=>{
    if(window.LAYINA_V2&&window.LAYINA_V2.hero){
      const img=document.querySelector('.hero-photo img');
      if(img) img.src=window.LAYINA_V2.hero;
    }
  };
  document.head.appendChild(heroScript);

  const theme=document.createElement('style');
  theme.textContent=`
    .appointment-strip{background:#f5efe6;color:#2d2722;padding:72px 7vw 78px}
    .appointment-strip .eyebrow{color:#a57c3c;margin-bottom:34px}
    .appointment-grid{max-width:1180px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px;border:0}
    .appointment-grid>div{position:relative;padding:34px 36px 32px;background:#fffdfa;border:1px solid rgba(165,124,60,.20);border-radius:18px;box-shadow:0 16px 38px rgba(52,39,24,.07)}
    .appointment-grid>div::before{content:"";display:block;width:42px;height:2px;margin-bottom:20px;background:#c3a062}
    .appointment-grid span,.method-grid span,.service-number{display:none!important}
    .appointment-grid strong{color:#2d2722;font-size:1.75rem;margin:0 0 7px;font-weight:500}
    .appointment-grid p{color:#756b62;font-size:.94rem;line-height:1.8}
    .method-grid{max-width:1120px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;border:0}
    .method-grid>div{padding:32px 34px;border:1px solid rgba(165,124,60,.20)!important;border-radius:16px;background:#fbf8f3}
    .method-grid h3{color:#a57c3c;font-size:1.9rem;margin:0 0 8px;font-weight:500}
    .method-grid p{font-size:.94rem;line-height:1.8}
    @media(max-width:700px){.appointment-grid,.method-grid{grid-template-columns:1fr}.appointment-grid>div,.method-grid>div{padding:28px 25px}.appointment-strip{padding:58px 20px 64px}}
  `;
  document.head.appendChild(theme);

  const menuButton=document.querySelector('.menu-button');
  const nav=document.querySelector('.site-header nav');
  if(menuButton&&nav) menuButton.addEventListener('click',()=>nav.classList.toggle('open'));
  document.querySelectorAll('.site-header nav a').forEach(a=>a.addEventListener('click',()=>nav&&nav.classList.remove('open')));
  const year=document.getElementById('year');
  if(year) year.textContent=new Date().getFullYear();
})();