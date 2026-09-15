(()=>{
  if(document.getElementById('layinaFixedCatalogue')) return;

  /* Retire l’ancienne logique de sélection commerciale cliquable. */
  document.querySelectorAll('.product-drawer,.product-drawer-backdrop').forEach(el=>el.remove());
  document.querySelectorAll('.reco-clickable').forEach(el=>{
    const clone=el.cloneNode(true);
    clone.classList.remove('reco-clickable');
    clone.removeAttribute('role');
    clone.removeAttribute('tabindex');
    clone.querySelectorAll('.reco-shop-badge').forEach(b=>b.remove());
    el.replaceWith(clone);
  });

  const style=document.createElement('style');
  style.id='layinaFixedCatalogue';
  style.textContent=`
    .layina-real-section{margin:34px 0 18px;padding:28px;border:1px solid rgba(185,138,67,.18);border-radius:24px;background:linear-gradient(145deg,#fffdf9,#f4e8dd);box-shadow:0 14px 38px rgba(53,36,24,.06)}
    .layina-real-head{display:grid;grid-template-columns:1fr minmax(220px,.65fr);gap:24px;align-items:end;margin-bottom:20px}
    .layina-real-head h2{font:500 clamp(2rem,4vw,3rem)/.95 "Cormorant Garamond",serif;margin:5px 0 0;color:#2d2521}
    .layina-real-head p{margin:0;color:#7e7068;line-height:1.65;font-size:.82rem}
    .layina-real-head .eyebrow{margin:0;color:#b98a43}
    .layina-fixed-note{display:inline-flex;align-items:center;gap:8px;margin-top:10px;padding:7px 10px;border-radius:999px;background:#f0e2cf;color:#8b6436;font-size:.61rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
    .layina-fixed-note:before{content:'✦';font-size:.7rem}
    .layina-real-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:15px}
    .layina-real-grid.four{grid-template-columns:repeat(4,minmax(0,1fr))}
    .layina-real-card{overflow:hidden;border:1px solid rgba(93,70,50,.12);border-radius:19px;background:#fffdfa;box-shadow:0 10px 28px rgba(52,36,23,.06)}
    .layina-real-photo{height:230px;background:#eee7df;overflow:hidden;position:relative}
    .layina-real-photo img{display:block;width:100%;height:100%;object-fit:cover;object-position:center}
    .layina-real-photo.contain img{object-fit:contain;padding:12px;background:#fff}
    .layina-real-copy{padding:16px 17px 18px}
    .layina-real-copy small{display:block;margin-bottom:5px;color:#b98a43;font-size:.58rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase}
    .layina-real-copy strong{display:block;color:#2d2521;font:500 1.28rem/1.05 "Cormorant Garamond",serif}
    .layina-real-copy p{margin:8px 0 0;color:#7e7068;font-size:.72rem;line-height:1.55}
    .layina-real-section.compact .layina-real-photo{height:205px}
    .layina-real-section.hair .layina-real-photo{height:280px}
    @media(max-width:980px){.layina-real-grid,.layina-real-grid.four{grid-template-columns:repeat(2,minmax(0,1fr))}.layina-real-head{grid-template-columns:1fr}}
    @media(max-width:620px){.layina-real-section{padding:20px 16px;border-radius:20px}.layina-real-grid,.layina-real-grid.four{grid-template-columns:1fr}.layina-real-photo,.layina-real-section.compact .layina-real-photo{height:260px}.layina-real-section.hair .layina-real-photo{height:320px}}
  `;
  document.head.appendChild(style);

  const visuals={
    glasses:[
      {title:'Monture écaille structurée',tag:'LUNETTES',text:'Une forme rectangulaire douce qui donne de la définition sans durcir les traits.',img:'https://images.unsplash.com/photo-1760446031441-65f456460d59?auto=format&fit=crop&w=900&q=82'},
      {title:'Monture noire épurée',tag:'LUNETTES',text:'Une ligne nette et contemporaine, facile à intégrer à un style classique ou plus affirmé.',img:'https://images.unsplash.com/photo-1768591309766-6799da9f3481?auto=format&fit=crop&w=900&q=82'},
      {title:'Monture noire fine',tag:'LUNETTES',text:'Un exemple réel plus discret pour garder le visage léger et mettre le regard en valeur.',img:'https://images.unsplash.com/photo-1483412468200-72182dbbc544?auto=format&fit=crop&w=900&q=82'}
    ],
    jewels:[
      {title:'Créoles dorées',tag:'BIJOUX',text:'Des créoles réelles pour visualiser un volume arrondi, lumineux et élégant près du visage.',img:'https://images.unsplash.com/photo-1680968921717-4abbbe793bb3?auto=format&fit=crop&w=900&q=82',contain:true},
      {title:'Collier fin doré',tag:'BIJOUX',text:'Une chaîne fine avec pendentif crée une ligne délicate et verticale sur le buste.',img:'https://images.unsplash.com/photo-1625792508553-5e66a81659fa?auto=format&fit=crop&w=900&q=82'}
    ],
    collars:[
      {title:'Col chemise',tag:'COL',text:'Un col net structure le haut du corps et donne immédiatement une allure plus construite.',img:'https://images.unsplash.com/photo-1757767503956-6b7387290da1?auto=format&fit=crop&w=900&q=82'},
      {title:'Col V',tag:'COL',text:'Le V ouvre l’encolure et crée une ligne verticale qui allonge visuellement le haut du buste.',img:'https://images.unsplash.com/photo-1543373038-79e5fd0bd84b?auto=format&fit=crop&w=900&q=82'},
      {title:'Col bateau',tag:'COL',text:'La ligne horizontale attire le regard vers les épaules et apporte plus de présence au haut.',img:'https://images.unsplash.com/photo-1548547217-a76b620ec6e6?auto=format&fit=crop&w=900&q=82'},
      {title:'Col roulé',tag:'COL',text:'Un exemple réel de col fermé qui encadre fortement le visage et donne une ligne très graphique.',img:'https://images.unsplash.com/photo-1605369572399-05d8d64a0f6e?auto=format&fit=crop&w=900&q=82'}
    ],
    hair:[
      {title:'Carré net',tag:'COIFFURE',text:'Une coupe réelle courte et structurée qui montre concrètement l’effet d’un carré autour du visage.',img:'https://images.unsplash.com/photo-1779350676620-fde279b1d023?auto=format&fit=crop&w=900&q=82'},
      {title:'Longueurs wavy',tag:'COIFFURE',text:'Des longueurs ondulées souples pour visualiser le mouvement et la douceur autour du visage.',img:'https://images.unsplash.com/photo-1770576568718-6747e3d85de8?auto=format&fit=crop&w=900&q=82'}
    ]
  };

  function card(v){
    return `<article class="layina-real-card"><div class="layina-real-photo ${v.contain?'contain':''}"><img loading="lazy" src="${v.img}" alt="${v.title}"></div><div class="layina-real-copy"><small>${v.tag}</small><strong>${v.title}</strong><p>${v.text}</p></div></article>`;
  }

  function section(title,intro,items,extra=''){
    return `<section class="layina-real-section ${extra}"><div class="layina-real-head"><div><p class="eyebrow">EXEMPLES VISUELS LAYINA</p><h2>${title}</h2><span class="layina-fixed-note">Images fixes · aucune redirection commerciale</span></div><p>${intro}</p></div><div class="layina-real-grid ${items.length===4?'four':''}">${items.map(card).join('')}</div></section>`;
  }

  const face=document.querySelector('[data-view-panel="face"]');
  if(face){
    face.insertAdjacentHTML('beforeend',section('De vraies montures pour mieux se projeter','Ici, les schémas sont complétés par de vraies lunettes en photo. Elles servent uniquement de repères visuels pour reconnaître les formes et les volumes.',visuals.glasses,'compact'));
    face.insertAdjacentHTML('beforeend',section('Coiffures : exemples réels','Des photos fixes permettent de voir la différence entre une coupe structurée et des longueurs plus souples.',visuals.hair,'hair'));
  }

  const accessories=document.querySelector('[data-view-panel="accessories"]');
  if(accessories){
    accessories.insertAdjacentHTML('beforeend',section('Bijoux : exemples réels','Des bijoux photographiés, sans marque ni lien marchand, pour comprendre immédiatement la taille, la forme et le tombé recommandés.',visuals.jewels,'compact'));
    accessories.insertAdjacentHTML('beforeend',section('Lunettes : exemples réels','Les montures restent visibles directement dans ton dossier LAYINA : rien à ouvrir, rien à acheter depuis l’application.',visuals.glasses,'compact'));
  }

  const silhouette=document.querySelector('[data-view-panel="silhouette"]');
  if(silhouette){
    silhouette.insertAdjacentHTML('beforeend',section('Les cols en vraies photos','Chaque type de col est montré sur un vêtement réel afin de comprendre immédiatement son effet sur l’encolure et la ligne d’épaules.',visuals.collars,'compact'));
  }
})();