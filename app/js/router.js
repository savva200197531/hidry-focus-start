import { mainPage } from "./mainPage.js";
import { cardPage } from "./cardPage.js";
import { cartLayer } from "./cartLayer.js";

class Router {
  constructor() {
  }

  renderTemplates = () => {
    console.log('render templates')
    const wrapper = document.querySelector('.wrapper');
    const cartOpen = document.querySelector('.cart-open');
    wrapper.innerHTML = '';
    let locationHashFiltered = location.hash.split('-')[0];
    if (locationHashFiltered === '#cart') locationHashFiltered = `${locationHashFiltered}-cart` ;
    cartOpen.href = '#cart';
    const templates = document.querySelectorAll('[data-template-url]');
    templates.forEach(template => {
      const content = template.content;
      const clonedLayout = content.cloneNode(content);
      console.log(locationHashFiltered)
      if (template.dataset.templateUrl === locationHashFiltered) wrapper.append(clonedLayout);
    })
    locationHashFiltered = location.hash.split('-')[0];
    switch (locationHashFiltered) {
      case '':
        mainPage.getData();
        break;
      case '#dog':
        cardPage.getData();
        break;
      case '#cart':
        cartLayer.openCart();
        break;
    }
    document.querySelector('.cart-open-counter').textContent = `(${JSON.parse(localStorage.getItem('cartData')).length})`;
  }
}

const router = new Router();

export { router };
