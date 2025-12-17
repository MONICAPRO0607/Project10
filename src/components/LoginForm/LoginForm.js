import { Button } from '../Button/Button'
import { FieldForm } from '../FieldForm/FieldForm'
import { doAuth } from '../../utils/functions/doLoginAndRegister';
import { showToast } from '../Toast/Toast';
import './LoginForm.css'

export const LoginForm = (form) => {
  form.className = 'login-form';
  form.innerHTML = `
    ${FieldForm({ labelText: 'Email', type: 'email' })}
    ${FieldForm({ labelText: 'Contraseña', type: 'password' })}
  `;

  form.addEventListener('submit', async (e) => {
  const result = await doAuth(e, 'login');
  if (result.success) {
    window.dispatchEvent(new Event('login-success'));
    window.location.hash = "/";
  }
});

  form.append(
    Button({
      text: 'Login',
      fnc: () => {}, 
      className: 'login-btn',
      type: 'submit' 
    })
  )
};
