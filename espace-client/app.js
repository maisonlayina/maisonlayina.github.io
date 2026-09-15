const loginView=document.getElementById('loginView');
const appView=document.getElementById('appView');
const loginForm=document.getElementById('loginForm');
const logoutButton=document.getElementById('logoutButton');
const navItems=[...document.querySelectorAll('.nav-item')];
const panels=[...document.querySelectorAll('[data-view-panel]')];
const menuButton=document.getElementById('menuButton');
const sidebar=document.getElementById('sidebar');
const topbarTitle=document.getElementById('topbarTitle');

const titles={dashboard:'Mon espace personnel',profile:'Mon profil',colorimetry:'Ma colorimétrie',face:'Mon visage',silhouette:'Ma silhouette',style:'Mon style',shopping:'Ma liste shopping',booklet:'Mon livret LAYINA',wedding:'Mon espace mariage'};

function showApp(){
  loginView.classList.add('is-hidden');
  appView.classList.remove('is-hidden');
}
function showLogin(){
  appView.classList.add('is-hidden');
  loginView.classList.remove('is-hidden');
}
function openView(view){
  panels.forEach(p=>p.classList.toggle('is-hidden',p.dataset.viewPanel!==view));
  navItems.forEach(n=>n.classList.toggle('active',n.dataset.view===view));
  topbarTitle.textContent=titles[view]||'Mon espace personnel';
  sidebar.classList.remove('open');
  window.scrollTo({top:0,behavior:'smooth'});
}

loginForm.addEventListener('submit',e=>{
  e.preventDefault();
  localStorage.setItem('layina_demo_session','1');
  showApp();
});
logoutButton.addEventListener('click',()=>{
  localStorage.removeItem('layina_demo_session');
  showLogin();
});
navItems.forEach(item=>item.addEventListener('click',()=>openView(item.dataset.view)));
document.querySelectorAll('[data-jump]').forEach(btn=>btn.addEventListener('click',()=>openView(btn.dataset.jump)));
menuButton.addEventListener('click',()=>sidebar.classList.toggle('open'));

if(localStorage.getItem('layina_demo_session')==='1')showApp();

const shoppingList=document.getElementById('shoppingList');
const shoppingForm=document.getElementById('shoppingForm');
const shoppingInput=document.getElementById('shoppingInput');
let shoppingItems=JSON.parse(localStorage.getItem('layina_demo_shopping')||'null')||[
  {text:'Blazer structuré beige chaud',done:false},
  {text:'Jean droit brut',done:false},
  {text:'Escarpins ou mocassins camel',done:true}
];
function saveShopping(){localStorage.setItem('layina_demo_shopping',JSON.stringify(shoppingItems))}
function renderShopping(){
  shoppingList.innerHTML='';
  shoppingItems.forEach((item,index)=>{
    const row=document.createElement('label');
    row.className='shopping-item'+(item.done?' done':'');
    row.innerHTML=`<input type="checkbox" ${item.done?'checked':''}><span></span><button type="button" aria-label="Supprimer">×</button>`;
    row.querySelector('span').textContent=item.text;
    row.querySelector('input').addEventListener('change',e=>{shoppingItems[index].done=e.target.checked;saveShopping();renderShopping()});
    row.querySelector('button').addEventListener('click',()=>{shoppingItems.splice(index,1);saveShopping();renderShopping()});
    shoppingList.appendChild(row);
  });
}
shoppingForm.addEventListener('submit',e=>{
  e.preventDefault();
  const text=shoppingInput.value.trim();
  if(!text)return;
  shoppingItems.push({text,done:false});
  shoppingInput.value='';
  saveShopping();
  renderShopping();
});
renderShopping();

if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));}