(function(){
  const brandFix=document.createElement('style');
  brandFix.textContent=`
    /* Demande finale : aucun logo image et aucune photo d'accueil. */
    .header-logo{
      display:flex!important;
      flex-direction:column!important;
      align-items:flex-start!important;
      justify-content:center!important;
      background:transparent!important;
      padding:4px 0!important;
      border-radius:0!important;
      box-shadow:none!important;
      color:#c3a062!important;
      line-height:1!important;
    }
    .header-logo img{display:none!important}
    .header-logo::before{
      content:"LAYINA";
      display:block;
      font-family:"Cormorant Garamond",Georgia,serif;
      font-size:2.1rem;
      font-weight:600;
      letter-spacing:.16em;
      color:#c3a062;
    }
    .header-logo::after{
      content:"Maison de la transformation";
      display:block;
      margin-top:6px;
      font-family:Montserrat,Arial,sans-serif;
      font-size:.68rem;
      font-weight:500;
      letter-spacing:.12em;
      text-transform:uppercase;
      color:#c3a062;
    }

    .hero{grid-template-columns:1fr!important}
    .hero-copy{max-width:900px!important}
    .hero-copy::before{display:none!important;content:none!important}
    .hero-photo{display:none!important}

    footer img{display:none!important}
    footer::before{
      content:"LAYINA";
      display:block;
      margin-bottom:4px;
      font-family:"Cormorant Garamond",Georgia,serif;
      font-size:2.3rem;
      font-weight:600;
      letter-spacing:.16em;
      color:#c3a062;
    }
    footer::after{
      content:"Maison de la transformation";
      display:block;
      margin:2px 0 18px;
      font-family:Montserrat,Arial,sans-serif;
      font-size:.72rem;
      font-weight:500;
      letter-spacing:.13em;
      text-transform:uppercase;
      color:#c3a062;
    }

    @media(max-width:600px){
      .header-logo::before{font-size:1.75rem}
      .header-logo::after{font-size:.58rem;letter-spacing:.09em}
    }
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