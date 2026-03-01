import { initQuote } from './js/quote.js';
import { initFilters } from './js/filters.js';
import { initFavoritesPage } from './js/favorites.js';
import { initSubscription } from './js/subscription.js';
import { initExerciseModal } from './js/exercise-modal.js';
import { initRatingModal } from './js/rating-modal.js';

class App {
  constructor() {
    this.dom = {};
  }

  init() {
    this.cacheDom();

    this.initModules();

    this.bindEvents();

    this.updateYear();
  }

  cacheDom() {
    this.dom.body = document.body;

    this.dom.menu = document.querySelector('[data-menu]');
    this.dom.menuOpen = document.querySelector('[data-menu-open]');
    this.dom.menuClose = document.querySelector('[data-menu-close]');

    this.dom.exercisesPage = document.querySelector('.exercises');

    this.dom.favoritesPage = document.querySelector('.favorites');

    this.dom.year = document.querySelector('[data-year]');
  }

  initModules() {
    initQuote();

    initSubscription();

    initExerciseModal();

    initRatingModal();

    if (this.dom.exercisesPage) initFilters();

    if (this.dom.favoritesPage) initFavoritesPage();
  }

  bindEvents() {
    this.dom.menuOpen?.addEventListener('click', () => this.openMenu());

    this.dom.menuClose?.addEventListener('click', () => this.closeMenu());

    document.addEventListener('keydown', this.handleEscape.bind(this));
  }

  openMenu() {
    this.dom.menu?.classList.add('is-open');

    this.dom.body.style.overflow = 'hidden';
  }

  closeMenu() {
    this.dom.menu?.classList.remove('is-open');

    this.dom.body.style.overflow = '';
  }

  handleEscape(e) {
    if (e.key === 'Escape') this.closeMenu();
  }

  updateYear() {
    if (this.dom.year) this.dom.year.textContent = new Date().getFullYear();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();

  app.init();
});
