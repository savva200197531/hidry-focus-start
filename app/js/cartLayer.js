import { getData } from "./getData.js";

class CartLayer {
  constructor() {
    this.data = [];
    this.cartData = [];
    this.cart = [];
    this.checkboxCount = 0;
  }

  openCart = () => {
    if (JSON.parse(localStorage.getItem('cartData'))) this.cartData = JSON.parse(localStorage.getItem('cartData'));
    const body = document.querySelector('body');
    this.cartTemplate = document.querySelector('.cart-template');
    const content = this.cartTemplate.content;

    const cart = content.cloneNode(content).querySelector('.cart-wrapper');
    const cartBody = cart.querySelector('.cart');
    body.classList.add('cart-opened');

    body.append(cart);

    setTimeout(() => cartBody.classList.add('cart-open-animation'));

    cart.addEventListener('click', event => {
      const target = event.target.classList.value
      if (target.includes('cart-wrapper') || target.includes('cart-close')) {
        location.hash = '#'
        cartBody.classList.remove('cart-open-animation');
        // cartBody.addEventListener('transitionend', () => {cart.remove(); body.classList.remove('cart-opened');});
        setTimeout(() => {
          cart.remove();
          body.classList.remove('cart-opened');
        }, 600);
      }
    });
    this.renderCart();
    const allCheckboxes = cartBody.querySelectorAll('input');
    allCheckboxes.forEach(element => element.addEventListener('click', event => this.productCheckboxes(event, allCheckboxes)));
    cartBody.querySelector('.cart-top__delete-wrapper').addEventListener('click', () => this.deleteAllProducts())
  }

  productCheckboxes = (event, allCheckboxes) => {
    if (event.target.id === 'cart-checkbox1') {
      if (event.target.checked) {
        this.checkboxCheck(allCheckboxes, true);
        this.checkboxCount = 4;
      } else {
        this.checkboxCheck(allCheckboxes, false);
        this.checkboxCount = 0;
      }
    } else {
      if (event.target.checked) this.checkboxCount++;
      else this.checkboxCount--;
      if (this.checkboxCount === 4) this.checkboxCheck(allCheckboxes, true);
      else if (this.checkboxCount < 4) allCheckboxes.forEach(checkbox => {if (checkbox.id === 'cart-checkbox1') checkbox.checked = false;});
      else if (this.checkboxCount === 0) this.checkboxCheck(allCheckboxes, false);
    }
  }

  checkboxCheck = (allCheckboxes, bool) => allCheckboxes.forEach(checkbox => checkbox.checked = bool);

  productIncrement = id => {
    this.findProduct(id, this.cartData).quantity++;
    localStorage.setItem('cartData', JSON.stringify(this.cartData));
    this.renderCart();
  }

  productDecrement = id => {
    if (this.findProduct(id, this.cartData).quantity > 1) {
      this.findProduct(id, this.cartData).quantity--;
      localStorage.setItem('cartData', JSON.stringify(this.cartData));
      this.renderCart();
    }
  }

  deleteProduct = id => {
    this.cartData = this.cartData.filter(item => item.id !== id)
    localStorage.setItem('cartData', JSON.stringify(this.cartData));
    this.renderCart();
  }

  deleteAllProducts = () => {
    this.cartData = [];
    localStorage.setItem('cartData', JSON.stringify(this.cartData));
    this.renderCart();
  }

  findProduct = (id, data) => data.find(item => item.id === id);

  addToCart = (id, data) => {
    if (JSON.parse(localStorage.getItem('cartData'))) this.cartData = JSON.parse(localStorage.getItem('cartData'));
    const product = this.findProduct(id, data);
    product['quantity'] = 1;
    if (this.cartData.length) {
      let isProductExist = false;
      this.cartData.map(item => {
        if (item.id === product.id) {
          isProductExist = true;
          item.quantity++;
        }
      })
      if (!isProductExist) this.cartData.push(product);
    } else {
      this.cartData.push(product);
    }

    localStorage.setItem('cartData', JSON.stringify(this.cartData));
    document.querySelector('.cart-open-counter').textContent = `(${JSON.stringify(this.cartData.length)})`;
  }

  renderCart = () => {
    const cartProducts = document.querySelector('.cart-products');
    if (cartProducts) {
      cartProducts.innerHTML = '';
      const cartRowTemplate = document.querySelector('.cart-row-template');
      const cartRowContent = cartRowTemplate.content;

      this.cartData.forEach(item => {

        const cartRowCloned = cartRowContent.cloneNode(cartRowContent);
        // // const productImg = cartRowCloned.querySelector('.cart-row__img');
        // // const productName = cartRowCloned.querySelector('.cart-row__text');
        // // const productCount = cartRowCloned.querySelector('.card-row__count');
        // // const productPrice = cartRowCloned.querySelector('.cart-row__price');
        // cart-checkbox1 id
        // cart-checkbox1 id

        cartRowCloned.querySelector('.cart-row__img').src = item.img;
        cartRowCloned.querySelector('.cart-row__text').textContent = item.name;
        cartRowCloned.querySelector('.card-row__count').textContent = item.quantity;
        cartRowCloned.querySelector('.cart-row__price').textContent = `${(item.price * item.quantity).toLocaleString()}₽`;
        cartRowCloned.querySelector('.product-decrement').addEventListener('click', () => this.productDecrement(item.id));
        cartRowCloned.querySelector('.product-increment').addEventListener('click', () => this.productIncrement(item.id));
        cartRowCloned.querySelector('.cart-row__bucket').addEventListener('click', () => this.deleteProduct(item.id));
        cartRowCloned.querySelector('.cart-checkbox').id = `cart-checkbox${item.id}`
        cartRowCloned.querySelector('.cart-label').setAttribute('for', `cart-checkbox${item.id}`);

        cartProducts.append(cartRowCloned);
      })

      document.querySelector('.cart-price__count').textContent = JSON.stringify(this.cartData.length);
      document.querySelector('.cart-price__price').textContent = this.cartData.reduce((prev, curr) => (curr.price * curr.quantity) + prev, 0);
    }
  }


}

const cartLayer = new CartLayer();

export { cartLayer };
