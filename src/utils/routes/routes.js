import { Home } from '../../pages/Home/Home.js';
import { Products } from '../../pages/Products/Products.js';
import { Login } from '../../pages/Login/Login.js';
import { Company } from '../../pages/Company/Company.js';
import { Clients } from '../../pages/Clients/Clients.js';
import { Orders } from '../../pages/Orders/Orders.js';
import { showToast } from '../../components/Toast/Toast.js';

export const routes = [
  { path: "/", text: "Home", page: Home },
  { path: "/products", text: "Productos", page: Products },
  { path: "/login", text: "Login", page: Login },
  { path: "/company", text: "Empresa", page: Company },
  { path: "/clients", text: "Clientes", page: Clients },
  { path: "/orders", text: "Pedidos", page: Orders },
];

export async function router() {
  const main = document.getElementById("app");
  if (!main) return;

  let hash = window.location.hash || "#/";
  const route = routes.find(r => `#${r.path}` === hash) || routes[0];

  const token = localStorage.getItem("token");
  if (route.protected && !token) {
    showToast({ message: "No autorizado. Debes iniciar sesión.", type: "error" });
    window.location.hash = "/login";
    return;
  }

  main.innerHTML = "";

  const pageNode = route.page.constructor.name === "AsyncFunction" ? await route.page() : route.page();
  main.appendChild(pageNode);
}
