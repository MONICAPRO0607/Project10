import './Orders.css'
import { createPage } from '../../utils/functions/createPage'
import { API } from '../../utils/API/API'

export const Orders = async () => {
  const div = createPage('orders')

  const title = document.createElement('h2')
  title.textContent = 'Lista de Pedidos'

  div.appendChild(title)

  const list = document.createElement('ul')
  div.appendChild(list)

  try {
    const token = localStorage.getItem('token');
    const pedidos = await API({
      endpoint: 'pedidos',
      token,
      method: 'GET'
    });

    if (pedidos.length === 0) {
      const noOrders = document.createElement('p');
      noOrders.textContent = 'No hay pedidos registrados.';
      div.appendChild(noOrders);
    } else {
      pedidos.forEach(order => {
        const li = document.createElement('li');
        li.textContent = `Pedido #${order._id} - Cliente: ${order.clienteId?.nombre || 'N/A'} (${order.clienteId?.email || 'N/A'}) - Total: ${order.materiales} - Estado: ${order.estado}`;
        list.appendChild(li);
      });
    }
  } catch (err) {
    console.error(err);
    const errorMsg = document.createElement('p');
    errorMsg.textContent = 'Error cargando pedidos.';
    div.appendChild(errorMsg);
  }

  div.appendChild(list);
  return div;
};
