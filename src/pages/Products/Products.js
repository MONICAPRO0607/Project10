import { API } from "../../utils/API/API";
import { createPage } from "../../utils/functions/createPage";
import { showToast } from "../../components/Toast/Toast";
import "./Products.css";

export const Products = async () => {
  const page = createPage("products");
  page.classList.add("products");

  const oldDrawer = document.getElementById("cart-drawer");
  const oldHandle = document.getElementById("cart-handle");
  if (oldDrawer) oldDrawer.remove();
  if (oldHandle) oldHandle.remove();

  let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const saveCart = () => localStorage.setItem("cart", JSON.stringify(cart));
  const totalItems = () => cart.length;

  const handle = document.createElement("button");
  handle.id = "cart-handle";
  handle.className = "cart-handle";
  handle.innerHTML = `
    <span class="cart-handle-icon" aria-hidden="true">🛒</span>
    <span class="cart-handle-text">Carrito</span>
    <span class="cart-count-badge" id="cart-count">${totalItems()}</span>
  `;
  handle.addEventListener("click", () => {
    drawer.classList.toggle("open");
  });

  const drawer = document.createElement("aside");
  drawer.id = "cart-drawer";
  drawer.className = "cart-drawer";
  drawer.innerHTML = `
    <div class="cart-header">
      <h3>Tu carrito</h3>
      <button class="cart-close" id="cart-close" title="Cerrar">✕</button>
    </div>
    <div class="cart-items" id="cart-items"></div>
    <div class="cart-footer">
      <div class="cart-total">
        <span>Total aprox.</span>
        <strong id="cart-total">—</strong>
      </div>
      <div class="cart-actions">
        <button class="btn-outline" id="cart-empty">Vaciar</button>
        <button class="btn-primary" id="cart-submit">Realizar pedido</button>
      </div>
    </div>
  `;
  document.body.appendChild(handle);
  document.body.appendChild(drawer);

  const els = {
    count: drawer.ownerDocument.getElementById("cart-count"),
    list: drawer.querySelector("#cart-items"),
    total: drawer.querySelector("#cart-total"),
    close: drawer.querySelector("#cart-close"),
    empty: drawer.querySelector("#cart-empty"),
    submit: drawer.querySelector("#cart-submit"),
  };

  els.close.addEventListener("click", () => drawer.classList.remove("open"));
  els.empty.addEventListener("click", () => {
    cart = [];
    saveCart();
    renderCart();
  });

  function renderCart() {
    els.count.textContent = totalItems();

    if (!cart.length) {
      els.list.innerHTML = `<p class="cart-empty">Tu carrito está vacío.</p>`;
      els.total.textContent = "—";
      return;
    }

    els.list.innerHTML = "";
    cart.forEach((item, idx) => {
      const row = document.createElement("div");
      row.className = "cart-row";
      row.innerHTML = `
        <div class="cart-row-info">
          <span class="cart-row-title">${item.categoria}</span>
          <span class="cart-row-sub">${item.subcategoria}</span>
        </div>
        <button class="cart-remove" aria-label="Eliminar" data-index="${idx}">✕</button>
      `;
      els.list.appendChild(row);
    });

    els.total.textContent = `${cart.length} artículo${cart.length !== 1 ? "s" : ""}`;
    els.list.querySelectorAll(".cart-remove").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const i = Number(e.currentTarget.dataset.index);
        cart.splice(i, 1);
        saveCart();
        renderCart();
      });
    });
  }

  let autoCloseTimer = null;
  function openDrawerTemporarily(ms = 2500) {
    drawer.classList.add("open");
    if (autoCloseTimer) clearTimeout(autoCloseTimer);
    autoCloseTimer = setTimeout(() => drawer.classList.remove("open"), ms);
  }

  els.submit.addEventListener("click", async () => {
    if (!cart.length) {
      showToast({ message: "El carrito está vacío.", type: "error" });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      showToast({ message: "Debes iniciar sesión para realizar el pedido.", type: "error" });
      return;
    }

    const payload = {
      tipo: "Pedido web",
      materiales: cart.map((i) => `${i.categoria} - ${i.subcategoria}`).join(" | "),
      medidas: "-",
    };

    try {
      const res = await API({
      endpoint: 'pedidos',
      method: 'POST',
      token,
      body: payload
    });

      if (!res.ok) throw new Error("Error al crear el pedido");

      showToast({ message: "¡Pedido realizado con éxito!", type: "success" });
      cart = [];
      saveCart();
      renderCart();
      drawer.classList.remove("open");
    } catch (err) {
      console.error(err);
      showToast({ message: "No se pudo realizar el pedido.", type: "error" });
    }
  });

   let products = [];
    try {
    const response = await API({ endpoint: "products" });
    products = Array.isArray(response) ? response : [];
    console.log("Productos cargados:", products);
    } catch (err) {
    console.error("Error al cargar productos:", err);
    showToast({ message: "No se pudieron cargar los productos.", type: "error" });
  };

  for (const product of products) {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    const h3 = document.createElement("h3");
    h3.textContent = product.categoria || product.nombre || "Producto";
    productDiv.appendChild(h3);

    const subList = document.createElement("ul");
    subList.classList.add("subcategorias");

    if (Array.isArray(product.subcategorias) && product.subcategorias.length) {
      for (const sub of product.subcategorias) {
        const subLi = document.createElement("li");
        subLi.classList.add("sub-btn");
        subLi.textContent = sub;
        subLi.addEventListener("click", () => {
          cart.push({
            categoria: h3.textContent,
            subcategoria: sub,
          });
          saveCart();
          renderCart();
          openDrawerTemporarily();
        });
        subList.appendChild(subLi);
      }
    } else {
      const subLi = document.createElement("li");
      subLi.classList.add("sub-btn");
      subLi.textContent = "Sin especificar";
      subList.appendChild(subLi);
    }

    productDiv.appendChild(subList);
    page.appendChild(productDiv);
  }

  renderCart();

  return page;
};
