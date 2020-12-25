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
    const allCheckboxes = document.querySelectorAll('.filter-block__checkbox');
    const checkedArr = [];
    allCheckboxes.forEach((checkbox, idx) => {

      // if (this.filtersByType.includes(checkbox.dataset.typeFilter)) {
      //   checkbox.checked = true;
      //   checkedArr.push(parseInt(checkbox.id.slice(-1)));
      // }
      // if (this.filtersByTraits.includes(checkbox.dataset.traitsFilter)) {
      //   checkbox.checked = true;
      //   checkedArr.push(parseInt(checkbox.id.slice(-1)));
      // }
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

  hashFilterSet = () => {
    let hash = [];
    if (this.filtersByType.length) {
      hash.push('-typeFilter?');
      this.filtersByType.forEach(filter => {
        hash.push(`&${filter}`);
      })
    }
    if (this.filtersByTraits.length) {
      hash.push('-traitsFilter?');
      this.filtersByTraits.forEach(filter => {
        hash.push(`&${filter}`);
      })
    }

    hash = Array.from(new Set(hash));
    location.hash = hash.join('');
  }

  hashFilter = () => {
    const filters = location.hash.split('-');
    filters.splice(0, 1)
    filters.forEach(filter => {
      switch (filter.split('?')[0]) {
        case 'typeFilter':
          this.filtersByType = this.hashFilterFill(filter);
          break;
        case 'traitsFilter':
          this.filtersByTraits = this.hashFilterFill(filter);
          break;
      }
    })
    this.itemsFilter();
  }

  hashFilterFill = (filter) => {
    const arr = filter.split('&');
    arr.splice(0, 1);
    return arr;
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
      this.filterChecked();
      this.loadMainPage();
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
