class CartLayer {
  constructor() {
    this.data = [];
    this.cartData = [];
    this.cart = [];
    this.checkboxCount = 0;
    this.cartOpen = '';
    this.finalPrice = '';
    this.declination = '';
    this.cartDataLength = '';
  }

  cartModal = () => {
    this.cartOpen = document.querySelector('.cart-open');
    const cartModalContent = document.querySelector('.cart-modal-template').content;
    const cartModal = cartModalContent.cloneNode(cartModalContent).querySelector('.cart-modal');
    this.cartOpen.addEventListener('mouseenter', () => this.openCartModal(cartModal));
    this.cartOpen.addEventListener('mouseleave', () => this.closeCartModal());
  }

  openCartModal = (cartModal) => {
    this.getCartData();
    cartModal.querySelector('.cart-modal-count').textContent = `${this.cartDataLength} ${this.declination}`;
    cartModal.querySelector('.cart-modal-price').textContent = this.finalPrice;
    this.cartOpen.append(cartModal);
  }

  declOfWord = (number, words) => words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];

  closeCartModal = () => {
    this.cartOpen.querySelector('.cart-modal').remove();
  }

  openCart = (type) => {
    if (JSON.parse(localStorage.getItem('cartData'))) this.cartData = JSON.parse(localStorage.getItem('cartData'));

    const body = document.querySelector('body');
    this.cartTemplate = document.querySelector('.cart-template');
    const content = this.cartTemplate.content;

    const cart = content.cloneNode(content).querySelector('.cart-wrapper');
    const cartBody = cart.querySelector('.cart');

    if (type === 'full') {
      body.classList.add('cart-opened');
      setTimeout(() => cartBody.classList.add('cart-open-animation'));

      document.querySelector('.breadcrumbs-section').classList.add('hidden');
      document.querySelector('.header').classList.add('hidden');

      cart.addEventListener('click', event => {
        const target = event.target.classList.value
        if (target.includes('cart-wrapper') || target.includes('cart-close')) {
          location.hash = localStorage.getItem('locationHashBefore');
          cartBody.classList.remove('cart-open-animation');
          document.querySelector('.breadcrumbs-section').classList.remove('hidden');
          document.querySelector('.header').classList.remove('hidden');
          setTimeout(() => {
            cart.remove();
            body.classList.remove('cart-opened');
          }, 600);
        }
      });

      body.append(cart);
      cartBody.querySelector('.cart-top__delete-wrapper').addEventListener('click', () => this.deleteAllProducts());
    }

    this.renderCart();
  }

  productCheckboxes = (cartBody) => {
    cartBody.querySelectorAll('input').forEach(element => element.addEventListener('click', event => {
      const allCheckboxes = cartBody.querySelectorAll('input');
      if (event.target.id === 'cart-checkbox-all') {
        if (event.target.checked) {
          this.checkboxCheck(allCheckboxes, true);
          this.checkboxCount = allCheckboxes.length - 1;
        } else {
          this.checkboxCheck(allCheckboxes, false);
          this.checkboxCount = 0;
        }
      } else {
        if (event.target.checked) this.checkboxCount++;
        else this.checkboxCount--;
        if (this.checkboxCount === allCheckboxes.length - 1) this.checkboxCheck(allCheckboxes, true);
        else if (this.checkboxCount < allCheckboxes.length - 1) allCheckboxes.forEach(checkbox =>
        {if (checkbox.id === 'cart-checkbox-all') checkbox.checked = false;});
        else if (this.checkboxCount === 0) this.checkboxCheck(allCheckboxes, false);
      }
    }));
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

  getCartData = () => {
    this.finalPrice = `${this.cartData.reduce((prev, curr) => (curr.price * curr.quantity) + prev, 0).toLocaleString()}₽`;
    this.declination = this.declOfWord(JSON.stringify(this.cartData.length), ['товар', 'товара', 'товаров']);
    this.cartDataLength = JSON.stringify(this.cartData.length);
  }
  renderCart = () => {
    this.getCartData();
    const cartProducts = document.querySelector('.cart-products');
    if (!cartProducts) {
      this.cartModal();
    } else {
      cartProducts.innerHTML = '';
      const cartRowTemplate = document.querySelector('.cart-row-template');
      const cartRowContent = cartRowTemplate.content;

      this.cartData.forEach(item => {
        const cartRowCloned = cartRowContent.cloneNode(cartRowContent);
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
      document.querySelector('.cart-price__count').textContent = this.cartDataLength;
      document.querySelector('.cart-price__price').textContent = this.finalPrice;
      this.checkboxCount = 0;
      this.productCheckboxes(document.querySelector('.cart'));
    }
  }


}

const cartLayer = new CartLayer();

export { cartLayer };
