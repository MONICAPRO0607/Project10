import { createPage } from "../../utils/functions/createPage"
import "./Company.css"

export const Company = () => {
  const div = createPage('company');
  div.classList.add("company");

  const title = document.createElement("h2");
  title.textContent = "Acerca de Planet Design";
  title.classList.add("company-title");

  const imagesContainer = document.createElement("div");
  imagesContainer.classList.add("company-images");

 const logoImg = document.createElement("img");
  logoImg.src = "/assets/logo.png";
  logoImg.alt = "Logo Planet Design";
  logoImg.classList.add("company-img", "company-logo");

  imagesContainer.append(logoImg);

  const text = document.createElement("div");
  text.classList.add("company-text");
  text.innerHTML = `
    <p><strong>Con 15 años de experiencia en el sector, abrimos Planet Design hace 10 años abre un nuevo concepto en la historia de la rotulación.</strong></p>
    <p>Forjados en nuestros inicios en los principales circuitos a nivel nacional e internacional, personalizando vehículos de competición al más alto nivel, nos dio la experiencia para ir formándonos en todos los ámbitos de este negocio.</p>
    <blockquote>“Aprendimos con los mejores...en el mejor momento”</blockquote>
    <p>Formula 1, Moto GP, Dakar, Rallies... los mayores niveles de exigencia que este negocio demanda.</p>
    <p>Más tarde nos formaríamos en el Diseño, rotulación de flotas comerciales, eventos, impresión digital y serigrafía así como en montajes de todo tipo.</p>
    <p>A día de hoy podemos decir orgullosos que nuestro nivel de trabajo, puntualidad, seriedad y exigencia propios son excelentes.</p>
  `;

  const viniloImg = document.createElement("img");
  viniloImg.src = "/assets/vinilo.jpg";
  viniloImg.alt = "Vehículo promocional";
  viniloImg.classList.add("company-img", "company-vinilo");

  const blockquote = text.querySelector("blockquote");
text.insertBefore(viniloImg, blockquote);

  div.append(title, imagesContainer, text);
  return div;
};