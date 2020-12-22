class CartLayer {
  constructor() {
  }

  getData = () => {
    // console.log('1');
    // cart-open-counter
  }

  cartOpen = event => {
    const body = document.querySelector('body');
    const cartTemplate = document.querySelector('.cart-template');
    const content = cartTemplate.content;

    const cart = content.cloneNode(content).querySelector('.cart-wrapper');
    const cartBody = cart.querySelector('.cart');
    body.classList.add('cart-opened');

    body.append(cart);

    setTimeout(() => cartBody.classList.add('cart-open-animation'));

    cart.addEventListener('click', event => {
      const target = event.target.classList.value
      if (target.includes('cart-wrapper') || target.includes('cart-close')) {
        body.classList.remove('cart-opened');
        cartBody.classList.remove('cart-open-animation');
        cartBody.addEventListener('transitionend', () => cart.remove());
      }
    });
  }

  addToCart = (id) => {
    console.log(id);
  }
}

const cartLayer = new CartLayer();

export { cartLayer };
