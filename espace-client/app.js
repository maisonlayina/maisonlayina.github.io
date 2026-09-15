const loginView=document.getElementById('loginView');
const appView=document.getElementById('appView');
const loginForm=document.getElementById('loginForm');
const logoutButton=document.getElementById('logoutButton');
const navItems=[...document.querySelectorAll('.nav-item')];
const panels=[...document.querySelectorAll('[data-view-panel]')];
const menuButton=document.getElementById('menuButton');
const sidebar=document.getElementById('sidebar');
const sidebarBackdrop=document.getElementById('sidebarBackdrop');
const topbarTitle=document.getElementById('topbarTitle');

const titles={dashboard:'Mon espace personnel',profile:'Mon profil',appointments:'Mes rendez-vous',colorimetry:'Ma colorimétrie',face:'Mon visage',silhouette:'Ma silhouette',style:'Mon style',accessories:'Lunettes & accessoires',posture:'Posture & présence',dressing:'Mon dressing',shopping:'Ma shopping list',booklet:'Mon livret LAYINA',wedding:'Mon espace mariage',messages:'Mes demandes'};

function showApp(){loginView.classList.add('is-hidden');appView.classList.remove('is-hidden')}
function showLogin(){appView.classList.add('is-hidden');loginView.classList.remove('is-hidden')}
function closeSidebar(){sidebar.classList.remove('open');sidebarBackdrop.classList.remove('show')}
function openView(view){
  panels.forEach(p=>p.classList.toggle('is-hidden',p.dataset.viewPanel!==view));
  navItems.forEach(n=>n.classList.toggle('active',n.dataset.view===view));
  topbarTitle.textContent=titles[view]||'Mon espace personnel';
  closeSidebar();
  history.replaceState(null,'','#'+view);
  window.scrollTo({top:0,behavior:'smooth'});
}

loginForm.addEventListener('submit',e=>{e.preventDefault();localStorage.setItem('layina_demo_session','1');showApp();openView('dashboard')});
logoutButton.addEventListener('click',()=>{localStorage.removeItem('layina_demo_session');showLogin();closeSidebar()});
navItems.forEach(item=>item.addEventListener('click',()=>openView(item.dataset.view)));
document.querySelectorAll('[data-jump]').forEach(btn=>btn.addEventListener('click',()=>openView(btn.dataset.jump)));
menuButton.addEventListener('click',()=>{sidebar.classList.toggle('open');sidebarBackdrop.classList.toggle('show',sidebar.classList.contains('open'))});
sidebarBackdrop.addEventListener('click',closeSidebar);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeSidebar()});

const hash=location.hash.replace('#','');
if(localStorage.getItem('layina_demo_session')==='1'){showApp();openView(titles[hash]?hash:'dashboard')}

const shoppingList=document.getElementById('shoppingList');
const shoppingForm=document.getElementById('shoppingForm');
const shoppingInput=document.getElementById('shoppingInput');
const shoppingPriority=document.getElementById('shoppingPriority');
const shoppingCount=document.getElementById('shoppingCount');
let shoppingItems=JSON.parse(localStorage.getItem('layina_demo_shopping_v2')||'null')||[
  {text:'Trench beige chaud',priority:'Priorité haute',done:false},
  {text:'Pantalon fluide ivoire',priority:'Priorité haute',done:false},
  {text:'Sac cognac structuré',priority:'Priorité moyenne',done:false},
  {text:'Top corail lumineux',priority:'Priorité moyenne',done:false},
  {text:'Mocassins camel',priority:'Priorité basse',done:true}
];
function saveShopping(){localStorage.setItem('layina_demo_shopping_v2',JSON.stringify(shoppingItems))}
function renderShopping(){
  shoppingList.innerHTML='';
  const remaining=shoppingItems.filter(i=>!i.done).length;
  if(shoppingCount)shoppingCount.textContent=remaining;
  shoppingItems.forEach((item,index)=>{
    const row=document.createElement('div');
    row.className='shopping-item'+(item.done?' done':'');
    row.innerHTML=`<input type="checkbox" ${item.done?'checked':''} aria-label="Marquer comme acheté"><span class="item-text"></span><span class="priority"></span><button type="button" aria-label="Supprimer">×</button>`;
    row.querySelector('.item-text').textContent=item.text;
    row.querySelector('.priority').textContent=item.priority||'Priorité moyenne';
    row.querySelector('input').addEventListener('change',e=>{shoppingItems[index].done=e.target.checked;saveShopping();renderShopping()});
    row.querySelector('button').addEventListener('click',()=>{shoppingItems.splice(index,1);saveShopping();renderShopping()});
    shoppingList.appendChild(row);
  });
}
shoppingForm.addEventListener('submit',e=>{
  e.preventDefault();
  const text=shoppingInput.value.trim();
  if(!text)return;
  shoppingItems.push({text,priority:shoppingPriority.value,done:false});
  shoppingInput.value='';
  saveShopping();renderShopping();
});
renderShopping();

const messageForm=document.getElementById('messageForm');
const messageInput=document.getElementById('messageInput');
const messageList=document.getElementById('messageList');
let messages=JSON.parse(localStorage.getItem('layina_demo_messages')||'[]');
function renderMessages(){
  messageList.querySelectorAll('.message.client').forEach(m=>m.remove());
  messages.forEach(text=>{
    const article=document.createElement('article');
    article.className='message client';
    article.innerHTML='<span>MA NOTE</span><p></p><small>Enregistrée dans cette démonstration</small>';
    article.querySelector('p').textContent=text;
    messageList.appendChild(article);
  });
}
messageForm.addEventListener('submit',e=>{
  e.preventDefault();
  const text=messageInput.value.trim();
  if(!text)return;
  messages.push(text);localStorage.setItem('layina_demo_messages',JSON.stringify(messages));messageInput.value='';renderMessages();
});
renderMessages();

const printBooklet=document.getElementById('printBooklet');
if(printBooklet)printBooklet.addEventListener('click',()=>window.print());

if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));}