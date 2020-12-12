const dogsData = [
  {
    "id": "1",
    "img": "1",
    "name": "Айну",
    "price": "12 000",
    "type": "hunting",
    "traits": "noFear"
  },
  {
    "id": "2",
    "img": "2",
    "name": "Афганская борзая",
    "price": "15 000",
    "type": "hunting",
    "traits": "shedsLil"
  },
  {
    "id": "3",
    "img": "3",
    "name": "Барбет",
    "price": "50 000",
    "type": "companions",
    "traits": "noFear"
  },
  {
    "id": "4",
    "img": "4",
    "name": "Бассет",
    "price": "10 000",
    "type": "hunting",
    "traits": "shedsLil"
  },
  {
    "id": "5",
    "img": "5",
    "name": "Легавой",
    "price": "39 000",
    "type": "companions",
    "traits": "shedsLil"
  },
  {
    "id": "6",
    "img": "6",
    "name": "Веттерхун",
    "price": "12 000",
    "type": "companions",
    "traits": "noFear"
  },
  {
    "id": "7",
    "img": "7",
    "name": "Древера",
    "price": "17 000",
    "type": "decorative",
    "traits": "health"
  },
  {
    "id": "8",
    "img": "8",
    "name": "Ирландский терьер",
    "price": "15 000",
    "type": "service",
    "traits": "obedience"
  },
  {
    "id": "9",
    "img": "9",
    "name": "Амереканский кокер",
    "price": "10 000",
    "type": "decorative",
    "traits": "health"
  },
  {
    "id": "10",
    "img": "10",
    "name": "Английский Кокер",
    "price": "8 000",
    "type": "decorative",
    "traits": "health"
  },
  {
    "id": "11",
    "img": "11",
    "name": "Дункер",
    "price": "20 000",
    "type": "service",
    "traits": "obedience"
  },
  {
    "id": "12",
    "img": "12",
    "name": "Спаниель",
    "price": "5 000",
    "type": "service",
    "traits": "obedience"
  }
]

const allCheckbox = document.querySelectorAll('.filter-block__checkbox');
let cards = document.querySelector('.cards');
const filtersByType = [];
const filtersByTraits = [];

const randomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

allCheckbox.forEach(checkbox => {
  checkbox.addEventListener('click', () => {
    if (checkbox.dataset.typeFilter) {
      dogFiltersFill(checkbox, filtersByType, 'typeFilter');
      dogFilter(filtersByType, 'type');
    } else {
      dogFiltersFill(checkbox, filtersByTraits, 'traitsFilter');
      dogFilter(filtersByTraits, 'traits');
    }
  })
})

const dogFilter = (filterBy, filter) => {
  const result = dogsData.filter(dog => filterBy.some(by => dog[filter].includes(by)));
  if (result.length > 0) dogIterator(result); else dogIterator(dogsData);
}

const dogFiltersFill = (checkbox, filterBy, filter) =>
  checkbox.checked
    ? filterBy.push(checkbox.dataset[filter])
    : filterBy.splice(filterBy.indexOf(checkbox.dataset[filter]), 1);

const dogIterator = (data) => {
  cards.innerHTML = '';
  const cardTemplate = document.querySelector('.card-template');
  const content = cardTemplate.content;

  for (let i = 0; i < data.length; i++) {
    const dogCard = content.cloneNode(content);
    dogCard.querySelector('.card__img').src = `assets/img/dog-card${data[i].img}-img.svg`;
    dogCard.querySelector('.card__title').textContent = data[i].name;
    dogCard.querySelector('.card__price').textContent = `${data[i].price}₽`;

    cards.append(dogCard);
  }
}

dogIterator(dogsData)

