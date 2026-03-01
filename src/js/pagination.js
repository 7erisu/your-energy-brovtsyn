import { icons } from './icons.js';

export function renderPagination(container, currentPage, totalPages, onChange) {
  if (!container) return;

  container.innerHTML = '';

  if (totalPages <= 1) return;

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  container.append(
    createArrowGroup('left', isFirst),

    createNumbers(currentPage, totalPages),

    createArrowGroup('right', isLast)
  );

  container.onclick = event => {
    const button = event.target.closest('[data-page]');

    if (!button || button.disabled) return;

    const newPage = resolvePage(button.dataset.page, currentPage, totalPages);

    if (newPage !== currentPage) onChange(newPage);
  };
}

function createArrowGroup(type, disabled) {
  const wrapper = document.createElement('div');

  wrapper.classList.add('pagination-arrows');

  if (type === 'right') wrapper.classList.add('pagination-arrows--right');

  const isLeft = type === 'left';

  wrapper.innerHTML = isLeft
    ? `
<button
class="pagination-arrow"
data-page="first"
${disabled ? 'disabled' : ''}
aria-label="First page"
>
<img
src="${disabled ? icons.chevronDoubleLeftLight : icons.chevronDoubleLeftDark}"
class="pagination-arrow-icon"
>
</button>

<button
class="pagination-arrow"
data-page="prev"
${disabled ? 'disabled' : ''}
aria-label="Previous page"
>
<img
src="${disabled ? icons.chevronLeftLight : icons.chevronLeftDark}"
class="pagination-arrow-icon"
>
</button>
`
    : `
<button
class="pagination-arrow"
data-page="next"
${disabled ? 'disabled' : ''}
aria-label="Next page"
>
<img
src="${disabled ? icons.chevronLeftLight : icons.chevronLeftDark}"
class="pagination-arrow-icon"
>
</button>

<button
class="pagination-arrow"
data-page="last"
${disabled ? 'disabled' : ''}
aria-label="Last page"
>
<img
src="${disabled ? icons.chevronDoubleLeftLight : icons.chevronDoubleLeftDark}"
class="pagination-arrow-icon"
>
</button>
`;

  return wrapper;
}

function createNumbers(currentPage, totalPages) {
  const container = document.createElement('div');

  container.classList.add('pagination-numbers');

  const pages = buildRange(currentPage, totalPages);

  pages.forEach(page => {
    if (page === '...') {
      const dots = document.createElement('span');

      dots.className = 'pagination-ellipsis';

      dots.textContent = '...';

      container.append(dots);

      return;
    }

    const el = document.createElement('span');

    el.className = 'pagination-num';

    el.textContent = page;

    el.dataset.page = page;

    if (page === currentPage) el.classList.add('is-active');

    container.append(el);
  });

  return container;
}

function resolvePage(action, current, total) {
  switch (action) {
    case 'first':
      return 1;

    case 'prev':
      return Math.max(1, current - 1);

    case 'next':
      return Math.min(total, current + 1);

    case 'last':
      return total;

    default:
      return parseInt(action, 10);
  }
}

function buildRange(current, total) {
  if (total <= 4) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = [];

  const midpoint = Math.ceil(total / 2);

  let start = Math.max(1, current - 1);
  let end = Math.min(total, current + 1);

  if (end - start < 2) {
    if (start === 1) end = Math.min(3, total);
    else if (end === total) start = Math.max(1, total - 2);
  }

  if (current <= midpoint) {
    for (let i = start; i <= end; i++) {
      pages.push(i);
    } 
    if (end < total) pages.push('...');
  } else {
    if (start > 1) pages.push('...');

    for (let i = start; i <= end; i++) pages.push(i);
  }

  return pages;
}
