import { getData } from "./getData.js";

class MainPage {
  constructor() {
    this.data = [];
    this.allData = [];
    this.filtersByType = [];
    this.filtersByTraits = [];
  }

  filterChecked = () => {
    const filterSegmentContent = document.querySelector('.filter-segment-template').content;
    const filterSegment = filterSegmentContent.cloneNode(filterSegmentContent).querySelector('.filter-segment');
    const checkedArr = [];
    const allCheckboxes = document.querySelectorAll('.filter-block__checkbox');
    allCheckboxes.forEach((checkbox, idx) => {
      checkbox.addEventListener('click', event => {
        const closest = event.target.closest('.filter-block__controls-wrapper');

        checkbox.dataset.typeFilter
          ? this.itemsFiltersFill(checkbox, this.filtersByType, 'typeFilter')
          : this.itemsFiltersFill(checkbox, this.filtersByTraits, 'traitsFilter');

        if (checkbox.checked) {
          closest.append(filterSegment);
          checkedArr.push(idx);
        } else {
          checkedArr.splice(checkedArr.indexOf(idx), 1);
          if (!checkedArr.length) {
            closest.querySelector('.filter-segment').remove();
            this.itemsFilter();
          } else {
            const elementBefore = allCheckboxes[checkedArr[checkedArr.length - 1]].closest('.filter-block__controls-wrapper');
            elementBefore.append(filterSegment);
          }
        }
      })
    })
    filterSegment.querySelector('.filter-segment__button').addEventListener('click', () => this.itemsFilter());
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
    console.log(this.data);
    this.loadMainPage();
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
    const cards = document.querySelector('.cards');
    if (cards) {
      cards.innerHTML = '';
      const cardTemplate = document.querySelector('.card-template');
      const content = cardTemplate.content;

      for (let i = 0; i < this.data.length; i++) {
        const dogCard = content.cloneNode(content);
        const dogCardBody = dogCard.querySelector('.card');
        dogCardBody.href = `#dog-${this.data[i].id}`
        dogCard.querySelector('.card__img').src = `assets/img/dog-card${this.data[i].img}-img.svg`;
        dogCard.querySelector('.card__title').textContent = this.data[i].name;
        dogCard.querySelector('.card__price').textContent = `${this.data[i].price}₽`;

        cards.append(dogCard);
      }
    }
  }
}

const mainPage = new MainPage();

export { mainPage };
