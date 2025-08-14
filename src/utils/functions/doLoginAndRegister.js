import { API } from "../API/API";

export const doAuth = async (e, action) => {
  e.preventDefault();

  // Dependiendo de la acción, recogemos inputs distintos
  let body = {};
  if (action === "login") {
    const [emailInput, passwordInput] = e.target;
    body = {
      email: emailInput.value.trim(),
      password: passwordInput.value.trim()
    };
  } 
  else if (action === "register") {
    const [nameInput, emailInput, passwordInput] = e.target;
    body = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      password: passwordInput.value.trim()
    };
  } 
  else {
    console.error(`Acción "${action}" no soportada`);
    return;
  }

  try {
    const res = await API({
      endpoint: `/user/${action}`,
      body,
      method: "POST"
    });

    if (action === "login") {
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", "admin"); // o 'user'
    }

    console.log(`${action} exitoso:`, res);
    return res;
  } catch (error) {
    console.error(`Error en ${action}:`, error);
  }
};