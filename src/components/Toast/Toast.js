import './Toast.css';

const container = document.createElement('div');
container.id = 'toast-container';
document.body.appendChild(container);

export const showToast = ({ message, type = 'info', duration = 3000 }) => {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('hide');
    toast.addEventListener('transitionend', () => toast.remove());
  }, duration);
};
