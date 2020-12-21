import { router } from "./router.js";

class LoadData {

  // loadCardPage = () => {
  //   this.getDataFn('http://localhost:3000/data/dogs.json').then(data => {
  //     const id = location.hash.split('-')[1];
  //     console.log(id);
  //   })
  // }
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
})

export { loadData };
