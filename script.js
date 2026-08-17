(function(){
  function loadHeroPhoto(){
    const s=document.createElement('script');
    s.src='v2-photo.js';
    s.onload=()=>{
      const img=document.querySelector('.hero-photo img');
      if(img && window.LAYINA_V2 && window.LAYINA_V2.hero){
        img.src=window.LAYINA_V2.hero;
      }
    };
    document.head.appendChild(s);
  }

  loadHeroPhoto();

  const menuButton=document.querySelector('.menu-button');
  const nav=document.querySelector('.site-header nav');
  if(menuButton&&nav){
    menuButton.addEventListener('click',()=>nav.classList.toggle('open'));
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
  }

  const year=document.getElementById('year');
  if(year) year.textContent=new Date().getFullYear();
})();
