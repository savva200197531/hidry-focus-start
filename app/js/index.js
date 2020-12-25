import { router } from "./router.js";
import { cartLayer } from "./cartLayer.js";

class LoadData {
}


// const randomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const loadData = new LoadData();

window.addEventListener('hashchange', () => {
  console.log('hash change')
  router.renderTemplates();
})

window.addEventListener('DOMContentLoaded', () => {
  console.log('dom loaded');
  router.renderTemplates();
  cartLayer.openCart('modal');
})

export { loadData };


// подсветка элемента (вкл/выкл), фильтр в урле
