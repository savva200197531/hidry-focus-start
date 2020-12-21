import { mainPage } from "./mainPage.js";

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
        // loadData.loadCardPage();
        break;
    }
  }
}

const router = new Router();

export { router };
