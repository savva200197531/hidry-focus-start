import { mainPage } from "./mainPage.js";
import { cardPage } from "./cardPage.js";
import { cartLayer } from "./cartLayer.js";

class Router {
  constructor() {
    this.locationsHashStorage = [];
  }

  renderTemplates = (event) => {
    this.locationsHashStorage.push(location.hash);
    const locationHashBefore = this.locationsHashStorage[this.locationsHashStorage.length - 2];
    let locationHashFiltered = location.hash.split('-')[0];
    if (locationHashFiltered === '#') locationHashFiltered = '';

    locationHashBefore
      ? localStorage.setItem('locationHashBefore', locationHashBefore)
      : localStorage.setItem('locationHashBefore', '#');

    const wrapper = document.querySelector('.wrapper');
    wrapper.innerHTML = '';
    const templates = document.querySelectorAll('[data-template-url]');
    templates.forEach(template => {
      const content = template.content;
      const clonedLayout = content.cloneNode(content);
      if (template.dataset.templateUrl === locationHashFiltered) wrapper.append(clonedLayout);
    })
    switch (locationHashFiltered) {
      case '':
        mainPage.getData();
        break;
      case '#dog':
        cardPage.getData();
        break;
      case '#cart':
        cartLayer.openCart('full');
        break;
    }
    if (JSON.parse(localStorage.getItem('cartData')))
      document.querySelector('.cart-open-counter').textContent
        = `(${JSON.parse(localStorage.getItem('cartData')).length})`;
  }
}

const router = new Router();

export { router };
