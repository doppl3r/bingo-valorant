import images from '../json/images.json';
import cards from '../json/cards.json';

class Game {
  constructor() {
    this.cards = cards;
    this.images = images;
  }

  getRandomBackground() {
    var index = Math.floor(Math.random() * this.images.backgrounds.length);
    var image = this.images.backgrounds[index];
    if (this.background == image) return this.getRandomBackground();
    this.background = image;
    return image;
  }

  getAllOptions() {
    return this.cards.options;
  }

  getNewOptions() {
    var options = [...this.cards.options]; // Duplicate new array
    var cols = 5; // Defined in CSS
    var rows = 5;
    options = options.sort(() => Math.random() - 0.5); // Shuffle options
    options = options.slice(0, rows * cols); // Slice array to 25
    options[(Math.floor(rows / 2) * cols) + Math.floor(cols / 2)] = 'Freebie'; // Set center to freebie
    return options;
  }
}

export { Game };