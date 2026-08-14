document.querySelectorAll('img[src^="assets/"]').forEach(img => {
  const name = img.getAttribute('src').split('/').pop();
  if (window.LAYINA_IMAGES && window.LAYINA_IMAGES[name]) {
    img.src = window.LAYINA_IMAGES[name];
  }
});

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-header nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => nav.classList.toggle('open'));
}
document.querySelectorAll('.site-header nav a').forEach(a => {
  a.addEventListener('click', () => nav && nav.classList.remove('open'));
});
document.querySelectorAll('.details-button').forEach(button => {
  button.addEventListener('click', () => {
    const details = button.nextElementSibling;
    details.hidden = !details.hidden;
    button.setAttribute('aria-expanded', String(!details.hidden));
    button.textContent = details.hidden ? 'En savoir plus' : 'Réduire';
  });
});
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
