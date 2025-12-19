import { API } from '../API/API'
import { showToast } from '../../components/Toast/Toast'

export const doAuth = async (e, action) => {
  e.preventDefault()

  let body = {}
  if (action === 'login') {
    const [emailInput, passwordInput] = e.target
    body = {
      email: emailInput.value.trim(),
      password: passwordInput.value.trim()
    }
  } else if (action === 'register') {
    const [nameInput, emailInput, passwordInput] = e.target
    body = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      password: passwordInput.value.trim()
    }
  } else {
    console.error(`Acción "${action}" no soportada`)
    return
  }

  try {
    const res = await API({
      endpoint: `/user/${action}`,
      body,
      method: 'POST'
    })

    if (action === 'login') {
      if (!res.token || !res.cliente)
        throw new Error('Respuesta inválida del backend')

      localStorage.setItem('token', res.token)
      localStorage.setItem(
        'user',
        JSON.stringify({
          nombre: res.cliente.nombre,
          email: res.cliente.email,
          rol: res.cliente.rol
        })
      )

      showToast({
        message: `¡Bienvenido ${res.cliente.nombre}!`,
        type: 'success'
      })
      return { success: true, cliente: res.cliente }
    }

    showToast({ message: `${action} exitoso`, type: 'success' })
    return { success: true, data: res }
  } catch (error) {
    console.error(`Error en ${action}:`, error)
    showToast({ message: error.message || `Error en ${action}`, type: 'error' })
    return { success: false, message: error.message || 'Error desconocido' }
  }
}
