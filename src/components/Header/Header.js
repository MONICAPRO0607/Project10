import { routes } from "../../utils/routes/routes";
import "./Header.css";
import { showToast } from "../Toast/Toast";

export const Header = () => {
  const header = document.createElement("header");
  const nav = document.createElement("nav");
  nav.classList.add("navbar");

  const logo = document.createElement("img");
  logo.src = "/assets/letras.jpg";
  logo.alt = "Logo";
  logo.classList.add("logo");
  nav.prepend(logo);

  const menuButton = document.createElement("button");
  menuButton.classList.add("menu-toggle");
  menuButton.setAttribute("Orbitron", "Abrir menú");
  menuButton.innerHTML = "☰";

  const ul = document.createElement("ul");
  ul.classList.add("nav-list");

  const closeMenu = () => {
  ul.classList.remove("show");
  };

  const renderMenu = () => {
    ul.innerHTML = '';
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem("user"));

  routes.forEach(route => {
    if (route.protected && !token) return;
    if (route.adminOnly && (!token || user?.rol !== "admin")) return;

    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = route.text;
    a.href = `#${route.path}`;
    a.addEventListener('click', closeMenu);
    li.append(a);
    ul.append(li);
  });

  const li = document.createElement('li');
    const a = document.createElement('a');
    if (token && user) {
      a.textContent = `Cerrar sesión (${user.nombre})`;
      a.href = '#';
      a.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        showToast({ message: "Has cerrado sesión", type: "info" });
        window.dispatchEvent(new Event("logout"));
        closeMenu();
        renderMenu();
      });
    } else {
      a.textContent = 'Login';
      a.href = '#/login';
      a.addEventListener('click', closeMenu);
    }
    li.append(a);
    ul.append(li);
  };

  renderMenu();
  menuButton.addEventListener('click', () => ul.classList.toggle('show'));

  nav.append(menuButton, ul);
  header.append(nav);
  document.body.insertBefore(header, document.body.firstChild);

  window.addEventListener('login-success', renderMenu);
  window.addEventListener('logout', renderMenu);
};