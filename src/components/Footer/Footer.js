import "./Footer.css";

export const Footer = () => {
  const footer = document.createElement("footer");
  footer.classList.add("footer");
  footer.innerHTML = `
    <div class="footer-content">
      &copy; ${new Date().getFullYear()} Planet Design. Todos los derechos reservados.
    </div>
  `;
  return footer;
};