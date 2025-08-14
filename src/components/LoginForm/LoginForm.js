import { Button } from '../Button/Button'
import { FieldForm } from '../FieldForm/FieldForm'
import { doAuth } from '../../utils/functions/doLoginAndRegister';
import './LoginForm.css'

export const LoginForm = (form) => {
  form.className = 'login-form'

  form.innerHTML = `
   ${FieldForm({ labelText: 'Email', type: 'email' })}
   ${FieldForm({ labelText: 'Contraseña', type: 'password' })}
    `
  form.addEventListener('submit', (e) => doAuth(e, 'login'));

  form.append(
    Button({
      text: 'Login',
      fnc: () => {}, 
      className: 'login-btn',
      type: 'submit' 
    })
  )
};
