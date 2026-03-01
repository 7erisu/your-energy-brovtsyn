import { getExerciseById } from './api.js';
import { exerciseModalMarkup } from './markup.js';
import { addFavorite, removeFavorite, isFavorite } from './favorites.js';
import { openRatingModal } from './rating-modal.js';
import { icons } from './icons.js';

let state = {
  backdrop: null,
  exercise: null,
};

export function initExerciseModal() {
  state.backdrop = document.querySelector('[data-modal-exercise]');
  if (!state.backdrop) return;

  document.addEventListener('click', handleOpenClick);

  state.backdrop.addEventListener('click', handleBackdropClick);

  document.addEventListener('keydown', handleEscape);
}

function handleOpenClick(e) {
  const btn = e.target.closest('[data-start-id]');
  if (!btn) return;
  openModal(btn.dataset.startId);
}

function handleBackdropClick(e) {
  if (e.target === state.backdrop || e.target.closest('[data-modal-close]')) {
    closeModal();
  }
}

function handleEscape(e) {
  if (e.key === 'Escape' && state.backdrop && !state.backdrop.hidden) {
    closeModal();
  }
}

export async function openModal(id) {
  try {
    const exercise = await getExerciseById(id);

    state.exercise = exercise;

    renderModal(exercise);

    bindFavorite();

    bindRating();
  } catch {}
}

function renderModal(exercise) {
  const fav = isFavorite(exercise._id);

  state.backdrop.innerHTML = exerciseModalMarkup(exercise, fav);

  state.backdrop.hidden = false;

  document.body.style.overflow = 'hidden';
}

function bindFavorite() {
  const btn = state.backdrop.querySelector('[data-fav-id]');

  if (!btn) return;

  btn.addEventListener('click', toggleFavorite);
}

function toggleFavorite() {
  const id = state.exercise._id;

  const text = state.backdrop.querySelector('[data-fav-id] span');

  const icon = state.backdrop.querySelector('[data-fav-id] img');

  if (isFavorite(id)) {
    removeFavorite(id);

    if (text) text.textContent = 'Add to favorites';

    if (icon) icon.src = icons.heartDark;
  } else {
    addFavorite(state.exercise);

    if (text) text.textContent = 'Remove';

    if (icon) icon.src = icons.heartFilledDark;
  }

  refreshFavoritesPage();
}

function bindRating() {
  const btn = state.backdrop.querySelector('[data-rating-id]');

  if (!btn) return;

  btn.addEventListener('click', () => {
    closeModal();

    openRatingModal(btn.dataset.ratingId);
  });
}

function refreshFavoritesPage() {
  if (!document.querySelector('.favorites')) return;

  if (window.__reinitFavorites) window.__reinitFavorites();
}

function closeModal() {
  if (!state.backdrop) return;

  state.backdrop.hidden = true;

  state.backdrop.innerHTML = '';

  document.body.style.overflow = '';
}
