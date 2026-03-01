import { workoutCardMarkup } from './markup.js';
import { renderPagination } from './pagination.js';

const STORAGE_KEY = 'favorites';
const PER_PAGE = 8;

let state = {
  list: null,
  pagination: null,
  page: 1,
};

export function getFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addFavorite(exercise) {
  const list = getFavorites();
  if (list.some(item => item._id === exercise._id)) return;
  list.push(exercise);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function removeFavorite(id) {
  const list = getFavorites().filter(item => item._id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function isFavorite(id) {
  return getFavorites().some(item => item._id === id);
}

export function initFavoritesPage() {
  state.list = document.querySelector('.favorites-list');
  state.pagination = document.querySelector('.favorites-content .pagination');

  if (!state.list) return;

  state.list.addEventListener('click', handleRemove);

  render(1);
}

function handleRemove(e) {
  const btn = e.target.closest('[data-remove-id]');
  if (!btn) return;

  removeFavorite(btn.dataset.removeId);

  render(state.page);
}

function render(page) {
  state.page = page;

  const favs = getFavorites();

  if (!favs.length) {
    state.list.innerHTML = `<li class="favorites-empty">
        <p>
          It appears that you haven't added any exercises to your favorites yet.
          Start exploring and add exercises that you enjoy to your favorites
          for easy access in the future.
        </p>
      </li>`;

    if (state.pagination) state.pagination.innerHTML = '';

    return;
  }

  const total = Math.ceil(favs.length / PER_PAGE);

  if (state.page > total) state.page = total;

  const start = (state.page - 1) * PER_PAGE;

  const items = favs.slice(start, start + PER_PAGE);

  state.list.innerHTML = items
    .map(item => workoutCardMarkup(item, { showTrash: true }))
    .join('');

  if (state.pagination) {
    renderPagination(state.pagination, state.page, total, render);
  }
}
