const button_navbar = document.querySelector('.navbar-hamburger');
const menu = document.querySelector('.navbar-menu');

button_navbar.addEventListener('click', () => {
  menu.classList.toggle('active'); 
});