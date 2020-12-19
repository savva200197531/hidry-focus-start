import {getData} from "./getData.js";

const filtersByType = [];
const filtersByTraits = [];
let filterSegment;

const getDataFn = (url) => {
  return getData(url)
}

const randomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const filterChecked = () => {
  const checkedArr = [];
  const allCheckboxes = document.querySelectorAll('.filter-block__checkbox');
  allCheckboxes.forEach((checkbox, idx) => {
    checkbox.addEventListener('click', event => {
      const closest = event.target.closest('.filter-block__controls-wrapper');

      checkbox.dataset.typeFilter
        ? itemsFiltersFill(checkbox, filtersByType, 'typeFilter')
        : itemsFiltersFill(checkbox, filtersByTraits, 'traitsFilter');

      if (checkbox.checked) {
        closest.append(filterSegment);
        checkedArr.push(idx);
      } else {
        checkedArr.splice(checkedArr.indexOf(idx), 1);
        if (!checkedArr.length) closest.querySelector('.filter-segment').remove();
        else {
          const elementBefore = allCheckboxes[checkedArr[checkedArr.length - 1]].closest('.filter-block__controls-wrapper');
          elementBefore.append(filterSegment);
        }
      }
      getDataFn('http://localhost:3000/data/dogs.json').then(data => itemsFilter(data));
    })
  })
}

const itemsFilter = (data) => {

  const result = data.filter(dog => {
    if (!filtersByType.length) return true;
    return filtersByType.some(type => dog.type === type);
  }).filter(dog => {
    if (!filtersByTraits.length) return true;
    return filtersByTraits.some(traits => dog.traits === traits);
  });
  console.log(result);

  // if (result.length > 0) loadData(result);
}

const itemsFiltersFill = (checkbox, filterBy, filter) =>
  checkbox.checked
    ? filterBy.push(checkbox.dataset[filter])
    : filterBy.splice(filterBy.indexOf(checkbox.dataset[filter]), 1);

const loadData = (data) => {
  let cards = document.querySelector('.cards');
  cards.innerHTML = '';
  const cardTemplate = document.querySelector('.card-template');
  const content = cardTemplate.content;

  for (let i = 0; i < data.length; i++) {
    const dogCard = content.cloneNode(content);
    const dogCardBody = dogCard.querySelector('.card');
    dogCard.querySelector('.card__img').src = `assets/img/dog-card${data[i].img}-img.svg`;
    dogCard.querySelector('.card__title').textContent = data[i].name;
    dogCard.querySelector('.card__price').textContent = `${data[i].price}₽`;

    cards.append(dogCard);

    // dogCardBody.addEventListener('click', () => {
    //   console.log(data[i].id)
    // })
  }
}

const renderTemplates = () => {
  console.log('render templates')
  const wrapper = document.querySelector('.wrapper');
  wrapper.innerHTML = '';
  const templates = document.querySelectorAll('[data-template-url]');
  templates.forEach(template => {
    const content = template.content;
    const clonedLayout = content.cloneNode(content);

    if (location.hash === template.dataset.templateUrl) wrapper.append(clonedLayout);
    switch (location.hash) {
      case '':
        getDataFn('http://localhost:3000/data/dogs.json').then(data => {
          loadData(data);
        })
        const filterSegmentContent = document.querySelector('.filter-segment-template').content;
        filterSegment = filterSegmentContent.cloneNode(filterSegmentContent).querySelector('.filter-segment');
        filterChecked();
        break;
    }
  })
}

window.addEventListener('hashchange', () => {
  console.log('hash change')
  renderTemplates();
})

window.addEventListener('DOMContentLoaded', () => {
  console.log('dom loaded')
  renderTemplates();
})
