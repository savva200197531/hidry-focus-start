class Backlight {
  constructor() {
    this.setColor = '';
    this.clearColor = '';
    this.allEls = '';
  }

  randomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

  initBacklight = (bool) => {
    this.allEls = document.querySelectorAll('*');
    if (bool) {
      this.setColor = setInterval(() => {
        const el = this.allEls[Math.floor(Math.random() * this.allEls.length)];
        const color = `rgb(${this.randomInteger(1, 255)}, ${this.randomInteger(1, 255)}, ${this.randomInteger(1, 255)})`;
        el.style.border = `1px solid ${color}`;
      }, 2000);

      this.clearColor = setInterval(() => {
        const el = this.allEls[Math.floor(Math.random() * this.allEls.length)];
        el.style.border = '';
      }, 2000);
    } else {
      clearInterval(this.setColor);
      clearInterval(this.clearColor);
      this.allEls.forEach(el => el.style.border = '');
    }
  }
}

const backlight = new Backlight();

export { backlight };


