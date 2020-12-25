import { getData } from "./getData.js";
import { cartLayer } from "./cartLayer.js";

class CardPage {
  constructor() {
    this.data = [];
  }

  getData = () => {
    getData('http://localhost:3000/data/dogs.json').then(data => {
      this.data = data;
      this.loadCardPage();
    }).catch(error => {
      console.error(error);
    })
  }

  loadCardPage = () => {
    const id = parseInt(location.hash.split('-')[1]);
    const cardContent = document.querySelector('.card-page-content');

    const cardData = this.data.find(item => item.id === id);

    cardContent.querySelector('.card-button__right').addEventListener('click', () => cartLayer.addToCart(id, this.data));
    cardContent.querySelector('.card-img').src = cardData.img;
    cardContent.querySelector('.card-title__text').textContent = `Характеристика ${cardData.name}`;
    cardContent.querySelector('.card-price__text').textContent = `${cardData.price.toLocaleString()}₽`;
    // cardContent.querySelectorAll('.card-row__text').
  }

}

const cardPage = new CardPage();

export { cardPage };
