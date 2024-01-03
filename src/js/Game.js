import images from '../json/images.json';
import cards from '../json/cards.json';

class Game {
  constructor() {
    this.cards = cards;
    this.images = images;
  }

  getRandomBackground() {
    var index = Math.floor(Math.random() * this.images.backgrounds.length);
    return this.images.backgrounds[index];
  }

  getNewOptions() {
    var options = [...this.cards.options]; // Duplicate new array
    options = options.sort(() => Math.random() - 0.5); // Shuffle options
    return options.slice(0, 25);
  }

  setFreeCard() {
    var box = $('.card label:nth-of-type(13)');
    box.click();
    box.find('span').text("Freebie");
  }
}

export { Game };