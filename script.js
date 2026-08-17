(function(){
  const menuButton=document.querySelector('.menu-button');
  const nav=document.querySelector('.site-header nav');
  if(menuButton&&nav){
    menuButton.addEventListener('click',()=>nav.classList.toggle('open'));
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
  }
  const year=document.getElementById('year');
  if(year) year.textContent=new Date().getFullYear();
})();