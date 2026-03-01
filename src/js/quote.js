import { getQuote } from './api.js';

const STORAGE_KEY = 'dailyQuote';

let state = {
  quoteEl: null,
  authorEl: null,
};

export function initQuote() {
  state.quoteEl = document.querySelector('.quote-card-quote');

  state.authorEl = document.querySelector('.quote-card-author');

  if (!state.quoteEl || !state.authorEl) return;

  const cached = loadFromStorage();

  if (cached) {
    render(cached);
    return;
  }

  fetchQuote();
}

async function fetchQuote() {
  try {
    const data = await getQuote();

    const payload = {
      quote: data.quote,
      author: data.author,
    };

    render(payload);

    saveToStorage(payload);
  } catch {}
}

function render({ quote, author }) {
  state.quoteEl.textContent = quote;
  state.authorEl.textContent = author;
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) return null;

    const data = JSON.parse(raw);

    if (!isToday(data.date)) return null;

    return {
      quote: data.quote,
      author: data.author,
    };
  } catch {
    return null;
  }
}

function saveToStorage({ quote, author }) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        quote,
        author,
        date: today(),
      })
    );
  } catch {}
}

function today() {
  return new Date().toDateString();
}

function isToday(date) {
  return date === today();
}
