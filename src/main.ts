import './style.scss'
import { perspective } from './perspective'

window.addEventListener("DOMContentLoaded", () => {
  const elem = document.querySelector(".card_wrap") as HTMLElement;
  perspective(elem);
})