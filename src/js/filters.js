import { getFilters } from './api.js';
import { filterCardMarkup } from './markup.js';
import { renderPagination } from './pagination.js';
import { showExercises, hideExercises } from './exercises.js';

const FILTER_MAP = {
  muscles: 'Muscles',
  'body-parts': 'Body parts',
  equipment: 'Equipment',
};

const PARAM_MAP = {
  muscles: 'muscles',
  'body-parts': 'bodypart',
  equipment: 'equipment',
};

let state = {
  filter: 'muscles',
  page: 1,
  tabsEl: null,
  listEl: null,
  paginationEl: null,
  titleEl: null,
};

export function initFilters() {
  state.tabsEl = document.querySelector('.exercises-tabs');
  state.listEl = document.querySelector('.exercises-list');
  state.paginationEl = document.querySelector('.exercises-grid .pagination');
  state.titleEl = document.querySelector('.exercises-title');

  if (!state.tabsEl || !state.listEl) return;

  state.tabsEl.addEventListener('click', handleTabClick);
  state.listEl.addEventListener('click', handleCardClick);

  fetchAndRender();
}

function handleTabClick(e) {
  const tab = e.target.closest('.exercises-tab');
  if (!tab) return;

  state.tabsEl
    .querySelectorAll('.exercises-tab')
    .forEach(el => el.classList.remove('is-active'));

  tab.classList.add('is-active');

  state.filter = tab.dataset.filter;
  state.page = 1;

  hideExercises();

  if (state.titleEl) state.titleEl.innerHTML = 'Exercises';

  fetchAndRender();
}

function handleCardClick(e) {
  const card = e.target.closest('.exercise-card');
  if (!card) return;

  e.preventDefault();

  const name = card.dataset.name;
  const param = PARAM_MAP[state.filter];

  showExercises(
    name,
    param,
    state.titleEl,
    state.listEl,
    state.paginationEl,
    fetchAndRender
  );
}

function fetchAndRender() {
  fetchFilters(state.filter, state.page, state.listEl, state.paginationEl);
}

async function fetchFilters(filter, page, listEl, paginationEl) {
  try {
    const data = await getFilters(FILTER_MAP[filter], page, 12);

    const items = data.results || [];

    listEl.innerHTML = items.length
      ? items.map(filterCardMarkup).join('')
      : `<li class="exercise-card">
           <p style="padding:20px;text-align:center;">
             No categories found.
           </p>
         </li>`;

    const total = parseInt(data.totalPages, 10) || 1;

    if (paginationEl) {
      renderPagination(paginationEl, page, total, newPage => {
        state.page = newPage;
        fetchFilters(filter, newPage, listEl, paginationEl);
      });
    }
  } catch {
    listEl.innerHTML = `
      <li class="exercise-card">
        <p style="padding:20px;text-align:center;">
          Failed to load filters.
        </p>
      </li>`;
  }
}
