const button_navbar = document.querySelector(".navbar-hamburger");
const menu = document.querySelector(".navbar-menu");

button_navbar.addEventListener("click", () => {
  menu.classList.toggle("active");

  if (menu.classList.contains("active")) {
    button_navbar.setAttribute("aria-label", "Close menú");
    button_navbar.innerHTML = "&#10005;"; 
  } else {
    button_navbar.setAttribute("aria-label", "Open menú");
    button_navbar.innerHTML = "&#9776;"; 
  }
});
