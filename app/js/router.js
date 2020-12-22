import { mainPage } from "./mainPage.js";
import { cardPage } from "./cardPage.js";
import { cartLayer } from "./cartLayer.js";

class Router {
  constructor() {
  }

  renderTemplates = () => {
    console.log('render templates')
    const wrapper = document.querySelector('.wrapper');
    wrapper.innerHTML = '';
    const locationHashFiltered = location.hash.split('-')[0];
    const templates = document.querySelectorAll('[data-template-url]');
    templates.forEach(template => {
      const content = template.content;
      const clonedLayout = content.cloneNode(content);
      if (locationHashFiltered === template.dataset.templateUrl) wrapper.append(clonedLayout);
    })
    switch (locationHashFiltered) {
      case '':
        mainPage.getData();
        break;
      case '#dog':
        cardPage.getData();
        break;
      case '#cart':
        cartLayer.getData();
        break;
    }
  }
}

const router = new Router();

export { router };
