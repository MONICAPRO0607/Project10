import './Button.css'

export const Button = ({ text, fnc, className, type = 'button' }) => {
  const button = document.createElement('button')
  button.type = type
  button.classList.add('main-button')
  button.classList.add(className)
  button.textContent = text
  button.addEventListener('click', fnc)
  return button
}
