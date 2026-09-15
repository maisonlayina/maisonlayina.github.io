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

function showApp(){if(loginView)loginView.classList.add('is-hidden');if(appView)appView.classList.remove('is-hidden')}
function showLogin(){if(appView)appView.classList.add('is-hidden');if(loginView)loginView.classList.remove('is-hidden')}
function closeSidebar(){if(sidebar)sidebar.classList.remove('open');if(sidebarBackdrop)sidebarBackdrop.classList.remove('show')}
function openView(view){
  panels.forEach(p=>p.classList.toggle('is-hidden',p.dataset.viewPanel!==view));
  navItems.forEach(n=>n.classList.toggle('active',n.dataset.view===view));
  if(topbarTitle)topbarTitle.textContent=titles[view]||'Mon espace personnel';
  closeSidebar();
  history.replaceState(null,'','#'+view);
  window.scrollTo({top:0,behavior:'smooth'});
}

if(loginForm)loginForm.addEventListener('submit',e=>{e.preventDefault();localStorage.setItem('layina_demo_session','1');showApp();openView('dashboard')});
if(logoutButton)logoutButton.addEventListener('click',()=>{localStorage.removeItem('layina_demo_session');showLogin();closeSidebar()});
navItems.forEach(item=>item.addEventListener('click',()=>openView(item.dataset.view)));
document.querySelectorAll('[data-jump]').forEach(btn=>btn.addEventListener('click',()=>openView(btn.dataset.jump)));
if(menuButton)menuButton.addEventListener('click',()=>{sidebar?.classList.toggle('open');sidebarBackdrop?.classList.toggle('show',sidebar?.classList.contains('open'))});
if(sidebarBackdrop)sidebarBackdrop.addEventListener('click',closeSidebar);

const hash=location.hash.replace('#','');
if(localStorage.getItem('layina_demo_session')==='1'){showApp();openView(titles[hash]?hash:'dashboard')}

/* Shopping list */
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
  if(!shoppingList)return;
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
if(shoppingForm)shoppingForm.addEventListener('submit',e=>{
  e.preventDefault();
  const text=shoppingInput?.value.trim();
  if(!text)return;
  shoppingItems.push({text,priority:shoppingPriority?.value||'Priorité moyenne',done:false});
  shoppingInput.value='';saveShopping();renderShopping();
});
renderShopping();

/* Notes / demandes */
const messageForm=document.getElementById('messageForm');
const messageInput=document.getElementById('messageInput');
const messageList=document.getElementById('messageList');
let messages=JSON.parse(localStorage.getItem('layina_demo_messages')||'[]');
function renderMessages(){
  if(!messageList)return;
  messageList.querySelectorAll('.message.client').forEach(m=>m.remove());
  messages.forEach(text=>{
    const article=document.createElement('article');
    article.className='message client';
    article.innerHTML='<span>MA NOTE</span><p></p><small>Enregistrée dans cette démonstration</small>';
    article.querySelector('p').textContent=text;
    messageList.appendChild(article);
  });
}
if(messageForm)messageForm.addEventListener('submit',e=>{
  e.preventDefault();
  const text=messageInput?.value.trim();
  if(!text)return;
  messages.push(text);localStorage.setItem('layina_demo_messages',JSON.stringify(messages));messageInput.value='';renderMessages();
});
renderMessages();

const printBooklet=document.getElementById('printBooklet');
if(printBooklet)printBooklet.addEventListener('click',()=>window.print());

/* Sélections visuelles LAYINA : vrais articles avec photos intégrées, sans redirection vers les boutiques */
const productSelections={
  'Lunettes':{
    title:'Lunettes adaptées à ton visage',
    subtitle:'Des montures réelles pour visualiser immédiatement les formes qui correspondent à tes recommandations.',
    products:[
      {brand:'Jimmy Fairly',name:'La Yana — noire rectangulaire',price:'135 €',why:'La ligne rectangulaire donne de la structure au regard tout en restant élégante.',image:'https://www.jimmyfairly.com/cdn/shop/files/P0806-BCKes_1.jpg?v=1739206306&width=1024',fit:'contain'},
      {brand:'Jimmy Fairly',name:'The Kos — noire rectangulaire',price:'Selon les verres',why:'Une monture nette et graphique, intéressante pour apporter de la définition sans surcharger le visage.',image:'https://www.jimmyfairly.com/cdn/shop/files/P0669-BCKe_WOMAN_2_1.png?v=1753712725&width=1024',fit:'cover'}
    ]
  },
  'Hauts':{
    title:'Hauts conseillés pour ta silhouette',
    subtitle:'Des exemples réels de hauts qui créent de la présence sur le haut du corps et attirent le regard vers le visage.',
    products:[
      {brand:'H&M',name:'Top manches longues beige clair',price:'Prix selon stock',why:'La teinte claire et la ligne épurée illuminent le haut du corps et restent faciles à accessoiriser.',image:'https://image.hm.com/assets/hm/ee/04/ee04bc236b50d4e9863a27bea85b92c10f79639c.jpg?imwidth=768',fit:'cover'},
      {brand:'H&M',name:'Top texturé crème',price:'Prix selon stock',why:'La texture ajoute du relief près du visage et donne plus de présence au haut de la silhouette.',image:'https://image.hm.com/assets/hm/53/10/5310da829757f157c167ec6031c4ce2cb5bd1040.jpg?imwidth=2160',fit:'cover'}
    ]
  },
  'Pantalons':{
    title:'Pantalons conseillés',
    subtitle:'Des lignes droites ou fluides qui accompagnent les hanches et gardent un tombé élégant.',
    products:[
      {brand:'H&M',name:'Pantalon large noir',price:'Prix selon stock',why:'La jambe ample et droite crée une ligne longue, sobre et facile à équilibrer avec un haut structuré.',image:'https://image.hm.com/assets/hm/1a/59/1a594fd879a85752bb6d54b963403779ed6daa1f.jpg?imwidth=2160',fit:'cover'},
      {brand:'H&M',name:'Pantalon large à lien',price:'Prix selon stock',why:'Une option plus souple qui conserve une vraie verticalité grâce à la jambe large et droite.',image:'https://image.hm.com/assets/hm/bb/57/bb573b4f0cee3aa6eb52a1ce984c2b9a339b3507.jpg?imwidth=2160',fit:'contain'}
    ]
  },
  'Jeans':{
    title:'Jeans conseillés',
    subtitle:'Des coupes droites qui gardent une ligne propre de la hanche jusqu’à l’ourlet.',
    products:[
      {brand:'H&M',name:'Jean taille haute jambe droite',price:'Prix selon stock',why:'La taille haute et la jambe droite offrent une base équilibrée, facile à porter avec des pièces plus structurées.',image:'https://image.hm.com/assets/002/9c/ae/9caedccad228ba7b147222d9d40ff3007a5e2b78.jpg?imwidth=2160',fit:'contain'},
      {brand:'H&M',name:'Straight high-waist jean bleu',price:'Prix selon stock',why:'Une coupe droite intemporelle qui allonge visuellement la jambe sans mouler les hanches.',image:'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1680510794-hmgoepprod-4-642a8f254f8e9.jpg?crop=1xw%3A1xh%3Bcenter%2Ctop&resize=980%3A%2A',fit:'cover'}
    ]
  },
  'Vestes':{
    title:'Vestes conseillées',
    subtitle:'Des épaules plus dessinées et une ligne verticale nette pour équilibrer la silhouette.',
    products:[
      {brand:'H&M',name:'Blazer sans col beige',price:'39,99 €',why:'Les épaules structurées et l’ouverture verticale donnent de la présence au haut du corps sans alourdir.',image:'https://image.hm.com/assets/hm/a9/39/a939fa865a151432c719e7724eea0c686e54b7bc.jpg',fit:'cover'}
    ]
  },
  'Jupes & robes':{
    title:'Jupes & robes conseillées',
    subtitle:'Des lignes portefeuille ou fluides qui accompagnent les courbes et mettent la taille en valeur.',
    products:[
      {brand:'COS',name:'Robe midi portefeuille froncée',price:'149 €',why:'Le drapé et la ligne portefeuille dessinent la taille tout en gardant un tombé fluide.',image:'https://media.cos.com/assets/001/7a/42/7a42d2670dacd56cc93850e4c7ea800ada81cc33_xxl-1.jpg?imwidth=2160',fit:'cover'},
      {brand:'H&M',name:'Robe portefeuille imprimée',price:'Prix selon stock',why:'Le décolleté en V et la fermeture portefeuille structurent le buste et accompagnent la taille.',image:'https://ae.hm.com/en/media_16050c8eead191e877a27453e76eefb8c3a10833b.jpg?format=pjpg&optimize=medium&width=1200',fit:'cover'}
    ]
  },
  'Manteaux':{
    title:'Manteaux conseillés',
    subtitle:'Des trenchs à la ligne nette qui allongent la silhouette et donnent de la structure aux épaules.',
    products:[
      {brand:'H&M',name:'Trench beige ceinturé',price:'Prix selon stock',why:'Le revers et la ceinture permettent de structurer le haut tout en gardant une grande verticalité.',image:'https://image.hm.com/assets/hm/5e/9e/5e9efdc34856d1ab0c38f3735ce15ed9a2c0c490.jpg?imwidth=1260',fit:'cover'},
      {brand:'H&M',name:'Trench croisé beige',price:'Prix selon stock',why:'Le double boutonnage, les pattes d’épaules et la ceinture créent une vraie présence sur le haut du corps.',image:'https://image.hm.com/assets/hm/89/80/89803e1583693f29e2026a234b95fe9898f5672c.jpg?imwidth=1536',fit:'contain'}
    ]
  }
};

const productStyle=document.createElement('style');
productStyle.textContent=`
.reco-clickable{cursor:pointer!important;position:relative;transition:.22s ease}.reco-clickable:hover{transform:translateY(-4px);box-shadow:0 22px 55px rgba(51,34,22,.13)!important;border-color:rgba(185,138,67,.42)!important}.reco-shop-badge{display:inline-flex!important;align-items:center;gap:7px;margin-top:14px;padding:7px 10px;border:1px solid rgba(185,138,67,.28);border-radius:999px;color:#9d7033!important;background:#fffaf2;font:600 .62rem Montserrat,sans-serif!important;letter-spacing:.06em!important;text-transform:uppercase!important}.reco-shop-badge:after{content:'→';font-size:.8rem}.product-drawer-backdrop{position:fixed;inset:0;background:rgba(20,15,12,.58);backdrop-filter:blur(6px);z-index:1000;opacity:0;pointer-events:none;transition:.25s}.product-drawer-backdrop.show{opacity:1;pointer-events:auto}.product-drawer{position:fixed;right:0;top:0;width:min(720px,96vw);height:100vh;background:linear-gradient(155deg,#fffdf9,#f3e6d9);z-index:1001;transform:translateX(102%);transition:.3s ease;box-shadow:-30px 0 80px rgba(30,20,14,.24);display:flex;flex-direction:column}.product-drawer.open{transform:translateX(0)}.product-drawer-head{padding:28px 30px 20px;border-bottom:1px solid rgba(90,68,48,.14);display:flex;gap:18px;align-items:flex-start}.product-drawer-head>div{flex:1}.product-drawer-head small{display:block;color:#b98a43;font-size:.63rem;letter-spacing:.18em;text-transform:uppercase;margin-bottom:7px}.product-drawer-head h2{font:500 2.35rem/1 "Cormorant Garamond",serif;margin:0;color:#2d2521}.product-drawer-close{width:42px;height:42px;border-radius:50%;border:1px solid rgba(90,68,48,.16);background:#fff;color:#6e5c50;font-size:1.3rem}.product-drawer-body{padding:22px 30px 36px;overflow:auto}.product-drawer-intro{color:#7e7068;line-height:1.65;font-size:.82rem;margin:0 0 20px}.real-products{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.real-product{overflow:hidden;background:#fffdfa;border:1px solid rgba(90,68,48,.13);border-radius:20px;box-shadow:0 10px 28px rgba(51,34,22,.06)}.real-product-photo{height:250px;background:#f3eee8;display:grid;place-items:center;overflow:hidden}.real-product-photo img{width:100%;height:100%;object-fit:cover;display:block}.real-product-photo img.contain{object-fit:contain;padding:10px;background:#fff}.real-product-copy{padding:16px 17px 18px}.real-product small{display:block;color:#b98a43;font-size:.58rem;letter-spacing:.12em;text-transform:uppercase;margin-bottom:5px}.real-product strong{display:block;font:500 1.28rem/1.1 "Cormorant Garamond",serif;color:#2d2521}.real-product p{margin:7px 0 12px;color:#7e7068;font-size:.72rem;line-height:1.5}.real-product-price{display:inline-flex;padding:7px 10px;border-radius:999px;background:#f2e4d3;color:#8c632f;font-size:.68rem;font-weight:700}.product-disclaimer{margin:20px 0 0;padding:14px 16px;border-radius:14px;background:#eee0d1;color:#7e7068;font-size:.68rem;line-height:1.5}@media(max-width:620px){.product-drawer-head,.product-drawer-body{padding-left:18px;padding-right:18px}.product-drawer-head h2{font-size:1.95rem}.real-products{grid-template-columns:1fr}.real-product-photo{height:280px}}
`;
document.head.appendChild(productStyle);

const drawerBackdrop=document.createElement('div');
drawerBackdrop.className='product-drawer-backdrop';
const productDrawer=document.createElement('aside');
productDrawer.className='product-drawer';
productDrawer.setAttribute('aria-hidden','true');
productDrawer.innerHTML='<div class="product-drawer-head"><div><small>SÉLECTION VISUELLE LAYINA</small><h2 id="productDrawerTitle">Articles recommandés</h2></div><button class="product-drawer-close" type="button" aria-label="Fermer">×</button></div><div class="product-drawer-body"><p class="product-drawer-intro" id="productDrawerIntro"></p><div class="real-products" id="realProducts"></div><p class="product-disclaimer">Exemples d’articles réels repérés en ligne pour illustrer les recommandations. Les collections, prix et disponibilités peuvent évoluer. LAYINA ne vend pas ces articles.</p></div>';
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
  selection.products.forEach(product=>{
    const card=document.createElement('article');
    card.className='real-product';
    card.innerHTML='<div class="real-product-photo"><img loading="lazy" alt=""></div><div class="real-product-copy"><small></small><strong></strong><p></p><span class="real-product-price"></span></div>';
    const img=card.querySelector('img');
    img.src=product.image;img.alt=product.name;if(product.fit==='contain')img.classList.add('contain');
    card.querySelector('small').textContent=product.brand;
    card.querySelector('strong').textContent=product.name;
    card.querySelector('p').textContent=product.why;
    card.querySelector('.real-product-price').textContent=product.price;
    realProducts.appendChild(card);
  });
  drawerBackdrop.classList.add('show');productDrawer.classList.add('open');productDrawer.setAttribute('aria-hidden','false');
}
productDrawer.querySelector('.product-drawer-close').addEventListener('click',closeProductDrawer);
drawerBackdrop.addEventListener('click',closeProductDrawer);
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeSidebar();closeProductDrawer()}});

/* Rend les recommandations cliquables */
document.querySelectorAll('.clothes-grid .clothes-card').forEach(card=>{
  const label=card.querySelector('strong')?.textContent.trim();
  if(!label||!productSelections[label])return;
  card.classList.add('reco-clickable');card.setAttribute('role','button');card.setAttribute('tabindex','0');
  const badge=document.createElement('span');badge.className='reco-shop-badge';badge.textContent='Voir les articles en photo';card.appendChild(badge);
  card.addEventListener('click',()=>openProductDrawer(label));
  card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openProductDrawer(label)}});
});
const glassesCard=[...document.querySelectorAll('[data-view-panel="accessories"] .accessory-feature .card')].find(card=>card.querySelector('span')?.textContent.trim()==='Monture signature');
if(glassesCard){
  glassesCard.classList.add('reco-clickable');glassesCard.setAttribute('role','button');glassesCard.setAttribute('tabindex','0');
  const badge=document.createElement('span');badge.className='reco-shop-badge';badge.textContent='Voir les lunettes en photo';glassesCard.appendChild(badge);
  glassesCard.addEventListener('click',()=>openProductDrawer('Lunettes'));
  glassesCard.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openProductDrawer('Lunettes')}});
}

if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));}
