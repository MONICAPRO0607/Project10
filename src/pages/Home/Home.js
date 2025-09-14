import "./Home.css";
import { Carousel } from "../../components/Carousel/Carousel.js";

export const Home = () => {
  const div = document.createElement("div");
  div.classList.add("home");

  const carouselImages = [
    "/assets/Imagen1.png",
    "/assets/Imagen2.png",
    "/assets/Imagen3.png", 
    "/assets/Imagen4.png",
    "/assets/Imagen6.png", 
    "/assets/Imagen7.png", 
    "/assets/Imagen9.png", 
    "/assets/Imagen10.png", 
  ];
  const carousel = Carousel(carouselImages);

  const title = document.createElement("h1");
  title.textContent = "Bienvenido a Planet Design";
  title.classList.add("home-title");

  const address = document.createElement("p");
  address.textContent = "Fuencarral-El Pardo, MADRID";
  address.classList.add("home-address");

  const phone = document.createElement("p");
  phone.textContent = "Teléfono: 916 984 268";
  phone.classList.add("home-phone");

  const sectionsWrapper = document.createElement("div");
  sectionsWrapper.classList.add("home-sections-wrapper");

  const btnPrev = document.createElement("button");
  btnPrev.classList.add("carousel-btn", "prev");
  btnPrev.textContent = "◀";

  const btnNext = document.createElement("button");
  btnNext.classList.add("carousel-btn", "next");
  btnNext.textContent = "▶";

  const sectionsTrack = document.createElement("div");
  sectionsTrack.classList.add("home-sections-track");

btnNext.onclick = () => {
  const card = sectionsTrack.querySelector(".home-card");
  const cardStyle = getComputedStyle(card);
  const cardWidth = card.offsetWidth + parseInt(cardStyle.marginRight);
  const maxScrollLeft = sectionsTrack.scrollWidth - sectionsTrack.clientWidth;
  const nextScroll = Math.min(sectionsTrack.scrollLeft + cardWidth, maxScrollLeft);
  sectionsTrack.scrollTo({ left: nextScroll, behavior: "smooth" });
};

btnPrev.onclick = () => {
  const card = sectionsTrack.querySelector(".home-card");
  const cardStyle = getComputedStyle(card);
  const cardWidth = card.offsetWidth + parseInt(cardStyle.marginRight);
  const prevScroll = Math.max(sectionsTrack.scrollLeft - cardWidth, 0);
  sectionsTrack.scrollTo({ left: prevScroll, behavior: "smooth" });
};

  const pages = [
    { text: "Productos", link: "#/products", icon: "🛍️" },
    { text: "Login", link: "#/login", icon: "🔑" },
    { text: "Empresa", link: "#/company", icon: "🏢" },
    { text: "Clientes", link: "#/clients", icon: "👥" },
    { text: "Pedidos", link: "#/orders", icon: "📦" },
  ];

  pages.forEach(page => {
    const card = document.createElement("div");
    card.classList.add("home-card");
    card.onclick = () => { window.location.hash = page.link; };

    const icon = document.createElement("div");
    icon.classList.add("home-card-icon");
    icon.textContent = page.icon;

    const text = document.createElement("h3");
    text.textContent = page.text;

    card.append(icon, text);
    sectionsTrack.appendChild(card);
  });

  sectionsWrapper.append(btnPrev, sectionsTrack, btnNext);

  div.append(carousel, title, address, phone, sectionsWrapper);
  return div;
};