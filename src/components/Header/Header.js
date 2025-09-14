
import { routes } from "../../utils/routes/routes";
import "./Header.css";

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

  routes.forEach(route => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = route.text;
    a.href = `#${route.path}`;
    li.append(a);
    ul.append(li);
  });

  menuButton.addEventListener("click", () => ul.classList.toggle("show"));
  nav.append(menuButton, ul);
  header.append(nav);

  document.body.insertBefore(header, document.body.firstChild);
};