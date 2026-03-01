import { getExercises } from './api.js';
import { workoutCardMarkup } from './markup.js';
import { renderPagination } from './pagination.js';
import { initSearch, destroySearch } from './search.js';

let state = {
  params: {},

  page: 1,

  listEl: null,

  paginationEl: null,

  goBack: null,

  titleEl: null,
};

export function showExercises(
  categoryName,

  paramName,

  titleEl,

  listEl,

  paginationEl,

  goBack
) {
  state.listEl = listEl;

  state.paginationEl = paginationEl;

  state.goBack = goBack;

  state.titleEl = titleEl;

  state.page = 1;

  state.params = {
    [paramName]: categoryName,

    limit: 10,
  };

  renderTitle(categoryName);

  initSearch(handleSearch);

  fetchAndRender();
}

export function hideExercises() {
  destroySearch();

  state.listEl?.classList.remove('exercises-list--workouts');
}

function renderTitle(categoryName) {
  if (!state.titleEl) return;

  state.titleEl.innerHTML = `
<span class="exercises-title-back">
Exercises
</span>
 /
<span class="exercises-title-category">
${categoryName}
</span>`;

  const backBtn = state.titleEl.querySelector('.exercises-title-back');

  if (!backBtn) return;

  backBtn.style.cursor = 'pointer';

  backBtn.addEventListener(
    'click',

    handleBack,

    { once: true }
  );
}

function handleBack() {
  hideExercises();

  if (state.titleEl) state.titleEl.innerHTML = 'Exercises';

  state.goBack?.();
}

function handleSearch(keyword) {
  state.params.keyword = keyword || undefined;

  state.page = 1;

  fetchAndRender();
}

async function fetchAndRender() {
  if (!state.listEl) return;

  try {
    const params = buildParams();

    const data = await getExercises(params);

    renderList(data.results || []);

    renderPager(data.totalPages);
  } catch {
    renderError();
  }
}

function buildParams() {
  const params = {
    ...state.params,

    page: state.page,
  };

  Object.keys(params).forEach(key => {
    if (params[key] === undefined) delete params[key];
  });

  return params;
}

function renderList(items) {
  if (!items.length) {
    state.listEl.innerHTML = `
<li class="workout-card">
<p style="padding:20px;text-align:center;">
No exercises found.
</p>
</li>`;
  } else {
    state.listEl.innerHTML = items.map(workoutCardMarkup).join('');
  }

  state.listEl.classList.add('exercises-list--workouts');
}

function renderPager(totalPages) {
  if (!state.paginationEl) return;

  const total = parseInt(totalPages, 10) || 1;

  renderPagination(
    state.paginationEl,

    state.page,

    total,

    handlePageChange
  );
}

function handlePageChange(page) {
  state.page = page;

  fetchAndRender();
}

function renderError() {
  state.listEl.innerHTML = `
<li class="workout-card">
<p style="padding:20px;text-align:center;">
Failed to load exercises.
</p>
</li>`;
}
