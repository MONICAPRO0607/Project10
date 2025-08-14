import './Cart.css'
import { createPage } from '../../utils/functions/createPage'

export const Cart = () => {
  const div = createPage('cart')
  const title = document.createElement('h2')
  title.textContent = 'Tu carrito'

  const cart = JSON.parse(localStorage.getItem('cart')) || []
  const list = document.createElement('ul')

  cart.forEach(item => {
    const li = document.createElement('li')
    li.textContent = `${item.name} - ${item.price}€`
    list.appendChild(li)
  })

  div.append(title, list)
  return div
}