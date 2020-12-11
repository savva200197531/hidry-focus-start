const allEls = Array.from(document.querySelectorAll('*'));

let itemFirst;
let itemSecond;
let colorFirst;
let colorSecond;

const randomIntegerFirst = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const randomIntegerSecond = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const randomIntegerThird = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

setInterval(() => {
  itemFirst = allEls[Math.floor(Math.random() * allEls.length)];
  itemSecond = allEls[Math.floor(Math.random() * allEls.length)];
}, 2000);

setInterval(() => {
  colorFirst = `rgb(${randomIntegerFirst(1, 255)}, ${randomIntegerSecond(1, 255)}, ${randomIntegerThird(1, 255)})`;
  colorSecond = `rgb(${randomIntegerFirst(1, 255)}, ${randomIntegerSecond(1, 255)}, ${randomIntegerThird(1, 255)})`;
}, 2000);

setInterval(() => {
  itemFirst.style.background = colorFirst;
  itemSecond.style.background = colorSecond;
}, 2000);

setTimeout(() => {
  itemFirst.style.background = '';
  itemSecond.style.background = '';
}, 2000);
