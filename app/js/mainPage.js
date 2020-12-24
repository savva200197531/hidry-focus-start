import { getData } from "./getData.js";
import { cartLayer } from "./cartLayer.js";

class MainPage {
  constructor() {
    this.cards = '';
    this.data = [];
    this.allData = [];
    this.filtersByType = [];
    this.filtersByTraits = [];
  }

  filterChecked = () => {
    const filterSegmentContent = document.querySelector('.filter-segment-template').content;
    const filterSegment = filterSegmentContent.cloneNode(filterSegmentContent).querySelector('.filter-segment');
    const filterSegmentText = filterSegment.querySelector('.filter-segment__text');
    const checkedArr = [];
    const allCheckboxes = document.querySelectorAll('.filter-block__checkbox');
    allCheckboxes.forEach((checkbox, idx) => {
      checkbox.addEventListener('click', event => {
        const closest = event.target.closest('.filter-block__controls-wrapper');

        checkbox.dataset.typeFilter
          ? this.itemsFiltersFill(checkbox, this.filtersByType, 'typeFilter')
          : this.itemsFiltersFill(checkbox, this.filtersByTraits, 'traitsFilter');

        this.itemsFilter();
        filterSegmentText.textContent = `Найдено ${this.data.length}`;
        if (checkbox.checked) {
          closest.append(filterSegment);
          checkedArr.push(idx);
        } else {
          checkedArr.splice(checkedArr.indexOf(idx), 1);
          if (!checkedArr.length) {
            closest.querySelector('.filter-segment').remove();
            this.loadMainPage();
          } else {
            const elementBefore = allCheckboxes[checkedArr[checkedArr.length - 1]].closest('.filter-block__controls-wrapper');
            elementBefore.append(filterSegment);
          }
        }
      })
    })
    filterSegment.querySelector('.filter-segment__button').addEventListener('click', () => {
      this.loadMainPage();
      if (!this.data.length) this.cards.textContent = 'Ничего не найдено';
    });
  }

  itemsFiltersFill = (checkbox, filterBy, filter) =>
    checkbox.checked
      ? filterBy.push(checkbox.dataset[filter])
      : filterBy.splice(filterBy.indexOf(checkbox.dataset[filter]), 1);

  itemsFilter = () => {
    this.data = this.allData.filter(dog => {
      if (!this.filtersByType.length) return true;
      return this.filtersByType.some(type => dog.type === type);
    }).filter(dog => {
      if (!this.filtersByTraits.length) return true;
      return this.filtersByTraits.some(traits => dog.traits === traits);
    });
  }

  getData = () => {
    getData('http://localhost:3000/data/dogs.json').then(data => {
      this.data = data;
      this.allData = data;
      this.loadMainPage();
      this.filterChecked();
    }).catch(error => {
      console.error(error);
    })
  }

  loadMainPage = () => {
    this.cards = document.querySelector('.cards');
    if (this.cards) {
      this.cards.innerHTML = '';
      const cardTemplate = document.querySelector('.card-template');
      const content = cardTemplate.content;

      this.data.forEach(item => {
        const card = content.cloneNode(content);
        const cardBody = card.querySelector('.card');
        cardBody.href = `#dog-${item.id}`
        card.querySelector('.card__img').src = item.img;
        card.querySelector('.card__title').textContent = item.name;
        card.querySelector('.card__price').textContent = `${item.price.toLocaleString()}₽`;
        card.querySelector('button').addEventListener('click', event => {
          event.preventDefault();
          cartLayer.addToCart(item.id, this.allData);
        })
        this.cards.append(card);
      })
    }
  }
}

const mainPage = new MainPage();

export { mainPage };
