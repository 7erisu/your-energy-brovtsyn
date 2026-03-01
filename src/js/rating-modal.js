import { patchExerciseRating } from './api.js';
import { ratingModalMarkup } from './markup.js';
import { icons } from './icons.js';

let state = {
  backdrop: null,
  rating: 0,
  exerciseId: null,
};

export function initRatingModal() {
  state.backdrop = document.querySelector('[data-modal-rating]');

  if (!state.backdrop) return;

  state.backdrop.addEventListener('click', handleBackdropClick);

  document.addEventListener('keydown', handleEscape);
}

export function openRatingModal(exerciseId) {
  if (!state.backdrop) return;

  state.exerciseId = exerciseId;
  state.rating = 0;

  state.backdrop.innerHTML = ratingModalMarkup(exerciseId);

  state.backdrop.hidden = false;

  document.body.style.overflow = 'hidden';

  bindStars();

  bindForm();
}

function handleBackdropClick(e) {
  if (e.target === state.backdrop || e.target.closest('[data-modal-close]')) {
    closeRatingModal();
  }
}

function handleEscape(e) {
  if (e.key === 'Escape' && state.backdrop && !state.backdrop.hidden) {
    closeRatingModal();
  }
}

function bindStars() {
  const stars = state.backdrop.querySelectorAll('[data-star]');

  const value = state.backdrop.querySelector('.modal-rating-value');

  stars.forEach(star => {
    star.style.cursor = 'pointer';

    star.addEventListener('click', () => {
      state.rating = parseInt(star.dataset.star, 10);

      updateStars(stars, state.rating);

      if (value) value.textContent = state.rating.toFixed(1);
    });
  });
}

function bindForm() {
  const form = state.backdrop.querySelector('.modal-rating-form');

  if (!form) return;

  form.addEventListener('submit', handleSubmit);
}

async function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;

  const msg = form.querySelector('.modal-rating-message');

  const email = form.email.value.trim();

  const review = form.review.value.trim();

  if (!state.rating || !email || !review) {
    if (msg) {
      msg.textContent =
        'Please fill in all fields: rating, email, and comment.';
      msg.hidden = false;
    }

    return;
  }

  try {
    await patchExerciseRating(state.exerciseId, {
      rate: state.rating,
      email,
      review,
    });

    if (msg) {
      msg.textContent = 'Thank you for your rating!';

      msg.className = 'modal-rating-message modal-rating-message--success';

      msg.hidden = false;
    }

    setTimeout(reopenExerciseModal, 1500);
  } catch (err) {
    if (msg) {
      msg.textContent =
        err.message || 'Failed to send rating. Please try again.';

      msg.className = 'modal-rating-message modal-rating-message--error';

      msg.hidden = false;
    }
  }
}

async function reopenExerciseModal() {
  closeRatingModal();

  const module = await import('./exercise-modal.js');

  module.openModal(state.exerciseId);
}

function closeRatingModal() {
  if (!state.backdrop) return;

  state.backdrop.hidden = true;

  state.backdrop.innerHTML = '';

  document.body.style.overflow = '';
}

function updateStars(stars, rating) {
  stars.forEach(star => {
    const val = parseInt(star.dataset.star, 10);

    star.src = val <= rating ? icons.starOrange : icons.starGrey;
  });
}
