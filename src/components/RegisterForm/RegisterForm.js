import { Button } from "../Button/Button";
import { FieldForm } from "../FieldForm/FieldForm";
import { doAuth } from "../../utils/functions/doLoginAndRegister";
import "./RegisterForm.css";

export const RegisterForm = (form) => {
  form.className = "register-form";

  form.innerHTML = `
    ${FieldForm({ labelText: "Nombre", type: "text"})}
    ${FieldForm({ labelText: "Email", type: "email"})}
    ${FieldForm({ labelText: "Contraseña", type: "password"})}
    ${FieldForm({ labelText: "Confirmar contraseña", type: "password"})}
  `;

  form.addEventListener('submit', (e) => doAuth(e, 'register'));

  form.append(
    Button({
      text: 'Registrarse',
      fnc: () => {}, 
      className: 'login-btn',
      type: 'submit' 
    })
  )
};