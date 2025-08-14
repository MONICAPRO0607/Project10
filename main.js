import './style.css';
import { Header } from './src/components/Header/Header';
import { Main } from './src/components/Main/Main';
import { Footer } from './src/components/Footer/Footer';
import { router } from './src/utils/routes/routes';

Header();
const main = Main();
document.body.appendChild(Footer());


window.addEventListener("hashchange", router);
window.addEventListener("load", router);
