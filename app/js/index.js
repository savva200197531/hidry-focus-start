import { router } from "./router.js";
import { cartLayer } from "./cartLayer.js";
import { backlight } from "./backlight.js";

class LoadData {}

const loadData = new LoadData();

window.addEventListener('hashchange', () => {
  router.renderTemplates();
})

window.addEventListener('DOMContentLoaded', () => {
  router.renderTemplates();
  cartLayer.openCart('modal');
})

document.querySelector('.switch').addEventListener('click', event =>
  event.target.checked ? backlight.initBacklight(true) : backlight.initBacklight(false));

export { loadData };


// подсветка элемента (вкл/выкл), фильтр в урле
