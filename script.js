const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-header nav');
menuButton.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('.site-header nav a').forEach(a => {
  a.addEventListener('click', () => nav.classList.remove('open'));
});
document.querySelectorAll('.details-button').forEach(button => {
  button.addEventListener('click', () => {
    const details = button.nextElementSibling;
    const open = !details.hidden;
    details.hidden = open;
    button.setAttribute('aria-expanded', String(!open));
    button.textContent = open ? 'En savoir plus' : 'Réduire';
  });
});
document.getElementById('year').textContent = new Date().getFullYear();
