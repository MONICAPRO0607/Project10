import './style.css';
import { Header } from './src/components/Header/Header';
import { Main } from './src/components/Main/Main';
import { Footer } from './src/components/Footer/Footer';
import { router } from './src/utils/routes/routes';

console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
Header();
const main = Main();

const app = document.getElementById('app') || (() => {
  const el = document.createElement('div');
  el.id = 'app';
  document.body.appendChild(el);
  return el;
})();

app.appendChild(main);
document.body.appendChild(Footer());


window.addEventListener("hashchange", router);
window.addEventListener("load", router);
