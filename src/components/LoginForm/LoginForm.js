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
    e.preventDefault();
    try {
      const result = await doAuth(e, 'login');
      if (result.success) {
        showToast({ message: 'Login correcto', type: 'success' });
        window.dispatchEvent(new Event('login-success')); 
      } else {
        showToast({ message: result.message || 'Error en login', type: 'error' });
      }
    } catch (err) {
      showToast({ message: 'Error de servidor', type: 'error' });
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
