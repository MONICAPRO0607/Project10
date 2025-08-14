import "./Carousel.css";

export const Carousel = (images = []) => {
  const container = document.createElement("div");
  container.classList.add("carousel-container");

  images.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.classList.add("carousel-img");
    if (index === 0) img.classList.add("active"); 
    container.appendChild(img);
  });

  let current = 0;
  const imgs = container.querySelectorAll(".carousel-img");

  setInterval(() => {
    imgs[current].classList.remove("active");
    current = (current + 1) % imgs.length;
    imgs[current].classList.add("active");
  }, 4000); 

  return container;
};