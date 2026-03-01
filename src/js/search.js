let state = {
  container: null,
  input: null,
  button: null,
  callback: null,
};

export function initSearch(onSearch) {
  state.container = document.querySelector('.exercises-search');

  if (!state.container) return;

  state.input = state.container.querySelector('.exercises-search-input');

  state.button = state.container.querySelector('.exercises-search-btn');

  state.callback = onSearch;

  state.container.hidden = false;

  state.input.addEventListener('keydown', handleKeydown);

  state.button.addEventListener('click', handleClick);
}

export function destroySearch() {
  if (!state.container) return;

  state.container.hidden = true;

  if (state.input) {
    state.input.value = '';

    state.input.removeEventListener('keydown', handleKeydown);
  }

  if (state.button) {
    state.button.removeEventListener('click', handleClick);
  }

  state.container = null;
  state.input = null;
  state.button = null;
  state.callback = null;
}

function handleKeydown(e) {
  if (e.key !== 'Enter') return;

  e.preventDefault();

  triggerSearch();
}

function handleClick() {
  triggerSearch();
}

function triggerSearch() {
  if (!state.callback || !state.input) return;

  const value = state.input.value.trim();

  state.callback(value);
}
