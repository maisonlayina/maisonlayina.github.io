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
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeSidebar();closeProductDrawer()}});

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

/* Sélections réelles LAYINA — exemples de démonstration, prix/stock susceptibles d'évoluer */
const productSelections={
  'Lunettes':{
    title:'Lunettes adaptées à ton visage',
    subtitle:'Des montures réelles qui reprennent tes recommandations : angulaire douce, largeur moyenne et teintes chaudes.',
    products:[
      {brand:'Jimmy Fairly',name:'La Jimmy — écaille rectangulaire',price:'135 €',why:'Monture rectangulaire en acétate, structurée sans être trop massive.',url:'https://www.jimmyfairly.com/fr/products/p508-h753e-jimmy'},
      {brand:'polette',name:'nº019 — écaille rectangulaire',price:'60 €',why:'Écaille chaude, largeur 141 mm et forme rectangulaire équilibrée.',url:'https://www.polette.com/fr/n-019.html'},
      {brand:'Jimmy Fairly',name:'La Wiz — écaille rectangulaire',price:'135 €',why:'Une monture légère et nette qui garde de la douceur autour du visage.',url:'https://www.jimmyfairly.com/fr/products/c0510-h653e-wiz'}
    ]
  },
  'Hauts':{
    title:'Hauts conseillés pour ta silhouette',
    subtitle:'Des pièces réelles qui donnent de la présence au haut du corps et attirent le regard vers le visage.',
    products:[
      {brand:'H&M',name:'Top à effet drapé avec encolure bateau',price:'5,49 €',why:'L’encolure bateau élargit visuellement la ligne d’épaules.',url:'https://www2.hm.com/fr_fr/productpage.1342631003.html'},
      {brand:'H&M',name:'Top façon crochet avec encolure bateau',price:'59,99 €',why:'Le col bateau et la texture créent de la présence sur le haut.',url:'https://www2.hm.com/fr_fr/productpage.1345187001.html'},
      {brand:'H&M',name:'Top à col marin avec broderie anglaise',price:'Voir le prix',why:'Le grand col et les détails sur les épaules rééquilibrent la silhouette.',url:'https://www2.hm.com/fr_fr/productpage.1339186001.html'}
    ]
  },
  'Pantalons':{
    title:'Pantalons conseillés',
    subtitle:'Des lignes fluides ou droites qui accompagnent les hanches sans ajouter de volume inutile.',
    products:[
      {brand:'H&M',name:'Pantalon large beige',price:'39,99 €',why:'Tombé ample, lignes nettes et taille haute.',url:'https://www2.hm.com/fr_fr/productpage.1290219001.html'},
      {brand:'COS via H&M',name:'Pantalon large en jersey fluide',price:'59 €',why:'Matière fluide et coupe ample très lisible visuellement.',url:'https://www2.hm.com/fr_fr/productpage.1304075001.html'},
      {brand:'H&M Limited Edition',name:'Pantalon à jambes larges beige clair',price:'29,99 €',why:'Coupe flottante et teinte claire facile à intégrer à une palette chaude.',url:'https://www2.hm.com/fr_fr/productpage.1314751001.html'}
    ]
  },
  'Jeans':{
    title:'Jeans conseillés',
    subtitle:'Des coupes droites qui gardent une ligne propre de la hanche à l’ourlet.',
    products:[
      {brand:'H&M',name:'Straight High Jeans — bleu denim foncé',price:'39,99 €',why:'Taille haute et jambe droite : une base facile à structurer.',url:'https://www2.hm.com/fr_fr/productpage.1304380001.html'},
      {brand:'H&M',name:'Straight High Jeans — bleu denim',price:'34,99 €',why:'Coupe droite avec légère aisance, simple à associer à un haut structuré.',url:'https://www2.hm.com/fr_fr/productpage.1269471001.html'},
      {brand:'H&M',name:'Jean droit — bleu denim',price:'Voir le prix',why:'Jambe droite et ligne sobre, sans surcharge sur les hanches.',url:'https://www2.hm.com/fr_fr/productpage.1314210001.html'}
    ]
  },
  'Vestes':{
    title:'Vestes conseillées',
    subtitle:'Des épaules structurées pour équilibrer la silhouette et renforcer ton style classique + flamboyant.',
    products:[
      {brand:'H&M',name:'Blazer beige clair à revers en pointe',price:'39,99 €',why:'Épaulettes et revers marqués donnent immédiatement de la structure au haut.',url:'https://www2.hm.com/fr_fr/productpage.1327396002.html'},
      {brand:'H&M',name:'Blazer sans col beige',price:'39,99 €',why:'Épaulettes et ligne verticale propre, facile à porter au quotidien.',url:'https://www2.hm.com/fr_fr/productpage.1324682002.html'},
      {brand:'H&M',name:'Blazer croisé beige clair',price:'27,99 €',why:'La fermeture croisée et les revers créent un point focal sur le haut du corps.',url:'https://www2.hm.com/fr_fr/productpage.1334688001.html'}
    ]
  },
  'Jupes & robes':{
    title:'Jupes & robes conseillées',
    subtitle:'Des lignes trapèze ou fluides qui suivent la silhouette sans la surcharger.',
    products:[
      {brand:'H&M',name:'Robe trapèze crème / beige',price:'19,99 €',why:'Coupe trapèze et encolure en V : une ligne simple et équilibrée.',url:'https://www2.hm.com/fr_fr/productpage.1135874007.html'},
      {brand:'H&M Edition',name:'Robe beige doré à ligne trapèze',price:'Voir le prix',why:'Teinte chaude et silhouette fluide cohérentes avec la palette printemps.',url:'https://www2.hm.com/fr_fr/productpage.1344935001.html'},
      {brand:'H&M',name:'Robe trapèze volantée beige / turquoise / rose',price:'29,99 €',why:'Volume réparti sur toute la longueur plutôt que concentré sur les hanches.',url:'https://www2.hm.com/fr_fr/productpage.1338234001.html'}
    ]
  },
  'Manteaux':{
    title:'Manteaux conseillés',
    subtitle:'Des pièces avec une vraie ligne d’épaule et une verticalité nette.',
    products:[
      {brand:'H&M',name:'Trench-coat à col entonnoir beige',price:'79,99 €',why:'Le col et la construction du haut créent de la présence au niveau des épaules.',url:'https://www2.hm.com/fr_fr/productpage.1341986001.html'},
      {brand:'Weekday via H&M',name:'Trench en toile oversize croisé beige',price:'149 €',why:'Épaulettes et toile structurée : parfait pour créer une ligne forte en haut.',url:'https://www2.hm.com/fr_fr/productpage.1289085003.html'},
      {brand:'H&M',name:'Trench-coat beige longueur genou',price:'Voir le prix',why:'Une ligne verticale longue et nette, facile à ceinturer selon l’effet souhaité.',url:'https://www2.hm.com/fr_fr/productpage.1282706001.html'}
    ]
  }
};

const productStyle=document.createElement('style');
productStyle.textContent=`
.reco-clickable{cursor:pointer!important;position:relative;transition:.22s ease}.reco-clickable:hover{transform:translateY(-4px);box-shadow:0 22px 55px rgba(51,34,22,.13)!important;border-color:rgba(185,138,67,.42)!important}.reco-shop-badge{display:inline-flex!important;align-items:center;gap:7px;margin-top:14px;padding:7px 10px;border:1px solid rgba(185,138,67,.28);border-radius:999px;color:#9d7033!important;background:#fffaf2;font:600 .62rem Montserrat,sans-serif!important;letter-spacing:.06em!important;text-transform:uppercase!important}.reco-shop-badge:after{content:'→';font-size:.8rem}.product-drawer-backdrop{position:fixed;inset:0;background:rgba(20,15,12,.55);backdrop-filter:blur(5px);z-index:1000;opacity:0;pointer-events:none;transition:.25s}.product-drawer-backdrop.show{opacity:1;pointer-events:auto}.product-drawer{position:fixed;right:0;top:0;width:min(560px,94vw);height:100vh;background:linear-gradient(155deg,#fffdf9,#f3e6d9);z-index:1001;transform:translateX(102%);transition:.3s ease;box-shadow:-30px 0 80px rgba(30,20,14,.22);display:flex;flex-direction:column}.product-drawer.open{transform:translateX(0)}.product-drawer-head{padding:28px 28px 20px;border-bottom:1px solid rgba(90,68,48,.14);display:flex;gap:18px;align-items:flex-start}.product-drawer-head>div{flex:1}.product-drawer-head small{display:block;color:#b98a43;font-size:.63rem;letter-spacing:.18em;text-transform:uppercase;margin-bottom:7px}.product-drawer-head h2{font:500 2.2rem/1 "Cormorant Garamond",serif;margin:0;color:#2d2521}.product-drawer-close{width:40px;height:40px;border-radius:50%;border:1px solid rgba(90,68,48,.16);background:#fff;color:#6e5c50;font-size:1.3rem}.product-drawer-body{padding:22px 28px 34px;overflow:auto}.product-drawer-intro{color:#7e7068;line-height:1.65;font-size:.82rem;margin:0 0 18px}.real-products{display:grid;gap:13px}.real-product{display:grid;grid-template-columns:54px 1fr auto;gap:14px;align-items:center;padding:17px;background:#fffdfa;border:1px solid rgba(90,68,48,.13);border-radius:18px;text-decoration:none;color:#2d2521;transition:.2s}.real-product:hover{transform:translateY(-2px);border-color:rgba(185,138,67,.4);box-shadow:0 14px 35px rgba(51,34,22,.08)}.real-product-mark{width:54px;height:54px;border-radius:16px;display:grid;place-items:center;background:linear-gradient(145deg,#f2dec0,#c99b59);font:600 1rem "Cormorant Garamond",serif;color:#60431f}.real-product small{display:block;color:#b98a43;font-size:.58rem;letter-spacing:.12em;text-transform:uppercase;margin-bottom:4px}.real-product strong{display:block;font:500 1.18rem/1.1 "Cormorant Garamond",serif}.real-product p{margin:6px 0 0;color:#7e7068;font-size:.7rem;line-height:1.45}.real-product-price{white-space:nowrap;font-size:.72rem;font-weight:700;color:#8c632f}.product-disclaimer{margin:18px 0 0;padding:14px 16px;border-radius:14px;background:#eee0d1;color:#7e7068;font-size:.68rem;line-height:1.5}@media(max-width:560px){.product-drawer-head,.product-drawer-body{padding-left:20px;padding-right:20px}.real-product{grid-template-columns:48px 1fr}.real-product-price{grid-column:2;justify-self:start}.product-drawer-head h2{font-size:1.9rem}}
`;
document.head.appendChild(productStyle);

const drawerBackdrop=document.createElement('div');
drawerBackdrop.className='product-drawer-backdrop';
const productDrawer=document.createElement('aside');
productDrawer.className='product-drawer';
productDrawer.setAttribute('aria-hidden','true');
productDrawer.innerHTML='<div class="product-drawer-head"><div><small>SÉLECTION LAYINA</small><h2 id="productDrawerTitle">Articles recommandés</h2></div><button class="product-drawer-close" type="button" aria-label="Fermer">×</button></div><div class="product-drawer-body"><p class="product-drawer-intro" id="productDrawerIntro"></p><div class="real-products" id="realProducts"></div><p class="product-disclaimer">Sélection d’exemples réels repérés le 15 septembre 2026. Les prix, tailles, couleurs et stocks peuvent évoluer sur les sites marchands. LAYINA n’est pas le vendeur de ces articles.</p></div>';
document.body.append(drawerBackdrop,productDrawer);
const productDrawerTitle=productDrawer.querySelector('#productDrawerTitle');
const productDrawerIntro=productDrawer.querySelector('#productDrawerIntro');
const realProducts=productDrawer.querySelector('#realProducts');
function closeProductDrawer(){productDrawer.classList.remove('open');drawerBackdrop.classList.remove('show');productDrawer.setAttribute('aria-hidden','true')}
function openProductDrawer(key){
  const selection=productSelections[key];if(!selection)return;
  productDrawerTitle.textContent=selection.title;
  productDrawerIntro.textContent=selection.subtitle;
  realProducts.innerHTML='';
  selection.products.forEach((product,index)=>{
    const a=document.createElement('a');
    a.className='real-product';a.href=product.url;a.target='_blank';a.rel='noopener';
    const initials=product.brand.split(/\s+/).map(w=>w[0]).join('').slice(0,2).toUpperCase();
    a.innerHTML='<span class="real-product-mark"></span><div><small></small><strong></strong><p></p></div><span class="real-product-price"></span>';
    a.querySelector('.real-product-mark').textContent=initials;
    a.querySelector('small').textContent=product.brand;
    a.querySelector('strong').textContent=product.name;
    a.querySelector('p').textContent=product.why;
    a.querySelector('.real-product-price').textContent=product.price;
    realProducts.appendChild(a);
  });
  drawerBackdrop.classList.add('show');productDrawer.classList.add('open');productDrawer.setAttribute('aria-hidden','false');
}
productDrawer.querySelector('.product-drawer-close').addEventListener('click',closeProductDrawer);
drawerBackdrop.addEventListener('click',closeProductDrawer);

/* Rend les recommandations cliquables */
document.querySelectorAll('.clothes-grid .clothes-card').forEach(card=>{
  const label=card.querySelector('strong')?.textContent.trim();
  if(!label||!productSelections[label])return;
  card.classList.add('reco-clickable');card.setAttribute('role','button');card.setAttribute('tabindex','0');
  const badge=document.createElement('span');badge.className='reco-shop-badge';badge.textContent='Voir des articles réels';card.appendChild(badge);
  card.addEventListener('click',()=>openProductDrawer(label));
  card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openProductDrawer(label)}});
});
const glassesCard=[...document.querySelectorAll('[data-view-panel="accessories"] .accessory-feature .card')].find(card=>card.querySelector('span')?.textContent.trim()==='Monture signature');
if(glassesCard){
  glassesCard.classList.add('reco-clickable');glassesCard.setAttribute('role','button');glassesCard.setAttribute('tabindex','0');
  const badge=document.createElement('span');badge.className='reco-shop-badge';badge.textContent='Voir des lunettes réelles';glassesCard.appendChild(badge);
  glassesCard.addEventListener('click',()=>openProductDrawer('Lunettes'));
  glassesCard.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openProductDrawer('Lunettes')}});
}

if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));}