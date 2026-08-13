const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-header nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => nav.classList.toggle('open'));
}
document.querySelectorAll('.details-button').forEach(button => {
  button.addEventListener('click', () => {
    const details = button.nextElementSibling;
    details.hidden = !details.hidden;
    button.textContent = details.hidden ? 'En savoir plus' : 'Réduire';
  });
});
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
