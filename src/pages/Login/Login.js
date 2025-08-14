import { Button } from '../../components/Button/Button';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';
import { createPage } from '../../utils/functions/createPage';
import { doAuth } from '../../utils/functions/doLoginAndRegister'; 
import './Login.css';

let showLogin = true; 

export const Login = () => {
  const div = createPage('login');

  const form = document.createElement('form');

  form.addEventListener('submit', (e) => {
    doAuth(e, showLogin ? 'login' : 'register');
  });

  LoginForm(form);

  const toggleButton = Button({
    text: 'Hazte cliente',
    fnc: () => {
      showLogin = !showLogin;
      showLogin ? LoginForm(form) : RegisterForm(form);
      toggleButton.textContent = showLogin ? 'Hazte cliente' : 'Iniciar sesión';
    },
    className: 'button-toggle'
  });

  div.append(form);
  div.append(toggleButton);
};
