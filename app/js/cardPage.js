import { getData } from "./getData.js";

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
    const cardContent = document.querySelector('.card-page-content');

    const cardImg = cardContent.querySelector('.card-img');
    const cardName = cardContent.querySelector('.card-title__text');
    const cardPrice = cardContent.querySelector('.card-price__text');
    const cardFeatures = cardContent.querySelectorAll('.card-row__text');

    const cardData = this.data.find(item => item.id === location.hash.split('-')[1]);

    cardImg.src = cardData.img;
    cardName.textContent = `Характеристика ${cardData.name}`;
    cardPrice.textContent = `${cardData.price}₽`;
  }

}

const cardPage = new CardPage();

export { cardPage };
