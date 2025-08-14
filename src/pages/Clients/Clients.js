import './Clients.css'
import { createPage } from '../../utils/functions/createPage'

export const Clients = () => {
  const div = createPage('clients')

  const title = document.createElement('h2')
  title.textContent = 'Lista de Clientes'

  const list = document.createElement('ul')
  const clients = [
    { id: 1, name: 'Cliente 1', email: 'cliente1@email.com' },
    { id: 2, name: 'Cliente 2', email: 'cliente2@email.com' }
  ]
  clients.forEach((client) => {
    const li = document.createElement('li')
    li.textContent = `${client.name} - ${client.email}`
    list.appendChild(li)
  })

  div.append(title, list)
  return div
}
