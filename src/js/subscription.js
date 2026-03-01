import { postSubscription } from './api.js';

let state = {
  form: null,
  input: null,
  message: null,
};

const emailPattern = /^\w+(\.\w+)?@[a-zA-Z_]+(\.[a-zA-Z_]+)*\.[a-zA-Z]{2,3}$/;

export function initSubscription() {
  state.form = document.querySelector('.footer-form');
  if (!state.form) return;

  state.input = state.form.querySelector('.footer-input');

  state.form.addEventListener('submit', handleSubmit);
}

async function handleSubmit(e) {
  e.preventDefault();

  const email = (state.input?.value || '').trim();
  if (!email) return;

  ensureMessageEl();

  if (!emailPattern.test(email)) {
    showMessage('Please enter a valid email address.', 'error');
    return;
  }

  try {
    const data = await postSubscription(email);
    showMessage(data?.message || 'Subscription successful!', 'success');
    if (state.input) state.input.value = '';
  } catch (err) {
    showMessage(
      err?.message || 'Subscription failed. Please try again.',
      'error'
    );
  }
}

function ensureMessageEl() {
  if (state.message) return;

  state.message = state.form.querySelector('.footer-form-message');

  if (!state.message) {
    state.message = document.createElement('p');
    state.message.classList.add('footer-form-message');
    state.form.appendChild(state.message);
  }
}

function showMessage(text, type) {
  state.message.textContent = text;
  state.message.className = `footer-form-message footer-form-message--${type}`;
  state.message.hidden = false;
}
