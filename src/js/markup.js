import { icons } from './icons.js';

function safe(value, fallback = '') {
  return value ?? fallback;
}

function formatRating(value) {
  return typeof value === 'number' ? value.toFixed(1) : '0.0';
}

function renderStars(rating = 0) {
  const full = Math.round(rating || 0);

  return Array.from(
    {
      length: 5,
    },
    (_, i) => {
      const icon = i < full ? icons.starOrange : icons.starGrey;

      return `<img src="${icon}" alt="" width="14" height="14" />`;
    }
  ).join('');
}

export function filterCardMarkup({ name, filter, imgURL }) {
  return `
<li class="exercise-card" data-name="${safe(name)}" data-filter="${safe(filter)}">
  <a class="exercise-card-link" href="#">
    <img
      src="${safe(imgURL)}"
      alt="${safe(name)}"
      class="exercise-card-img"
      loading="lazy"
    />
    <div class="exercise-card-overlay">
      <p class="exercise-card-name">${safe(name)}</p>
      <p class="exercise-card-subtitle">${safe(filter)}</p>
    </div>
  </a>
</li>`;
}

export function workoutCardMarkup(exercise, options = {}) {
  const { showTrash = false } = options;

  const rating = formatRating(exercise.rating);

  const trashButton = showTrash
    ? `
<button
  class="workout-card-trash"
  type="button"
  aria-label="Remove from favorites"
  data-remove-id="${exercise._id}"
>
  <img src="${icons.trash}" alt="" width="16" height="16" />
</button>`
    : '';

  return `
<li class="workout-card" data-exercise-id="${exercise._id}">

  <div class="workout-card-top">

    <span class="workout-card-badge">
      WORKOUT
    </span>

    <span class="workout-card-rating">
      ${rating}
      <img src="${icons.starOrange}" alt="rating" />
    </span>

    ${trashButton}

    <button
      class="workout-card-start"
      type="button"
      data-start-id="${exercise._id}"
    >
      Start
      <img src="${icons.arrowRight}" alt="" />
    </button>

  </div>

  <div class="workout-card-body">

    <div class="workout-card-icon">

      <img
        src="${icons.runningManLight}"
        alt=""
        width="24"
        height="24"
      />

    </div>

    <h3 class="workout-card-name">
      ${safe(exercise.name)}
    </h3>

  </div>

  <div class="workout-card-meta">

    <span>
      Burned calories:
      <strong>
        ${safe(exercise.burnedCalories)} /
        ${safe(exercise.time)} min
      </strong>
    </span>

    <span>
      Body part:
      <strong>
        ${safe(exercise.bodyPart)}
      </strong>
    </span>

    <span>
      Target:
      <strong>
        ${safe(exercise.target)}
      </strong>
    </span>

  </div>

</li>`;
}

export function exerciseModalMarkup(exercise, isFav = false) {
  const rating = formatRating(exercise.rating);

  const favText = isFav ? 'Remove' : 'Add to favorites';

  const heartIcon = isFav ? icons.heartFilledDark : icons.heartDark;

  return `
<div class="modal-exercise-content">

<button
  class="modal-close"
  type="button"
  aria-label="Close"
  data-modal-close
>
  <img
    class="modal-close-icon"
    src="${icons.xLight}"
    alt=""
    width="24"
    height="24"
  />
</button>

<div class="modal-exercise-gif">

  <img
    src="${safe(exercise.gifUrl)}"
    alt="${safe(exercise.name)}"
  />

</div>

<div class="modal-exercise-info">


<h3 class="modal-exercise-title">
${safe(exercise.name)}
</h3>

<div class="modal-exercise-rating">

<span class="modal-exercise-rating-value">
${rating}
</span>


<div class="modal-exercise-stars">
${renderStars(exercise.rating)}
</div>
</div>
<div class="modal-exercise-details">

${renderDetail('Target', exercise.target)}

${renderDetail('Body Part', exercise.bodyPart)}

${renderDetail('Equipment', exercise.equipment)}

${renderDetail('Popular', exercise.popularity)}

${renderDetail(
  'Burned calories',
  `${exercise.burnedCalories}/${exercise.time} min`
)}

</div>

<p class="modal-exercise-desc">
${safe(exercise.description)}
</p>

<div class="modal-exercise-actions">

<button
  class="modal-btn modal-btn-fav"
  type="button"
  data-fav-id="${exercise._id}"
>

<span>${favText}</span>

<img
  src="${heartIcon}"
  alt=""
  width="18"
  height="18"
/>

</button>

<button
  class="modal-btn modal-btn-rating"
  type="button"
  data-rating-id="${exercise._id}"
>
Give a rating
</button>
</div>
</div>
</div>`;
}

function renderDetail(label, value) {
  return `
<div class="modal-exercise-detail-item">

<span class="modal-exercise-detail-label">
${label}
</span>

<span class="modal-exercise-detail-value">
${safe(value)}
</span>

</div>`;
}

export function ratingModalMarkup(exerciseId) {
  const stars = Array.from(
    {
      length: 5,
    },
    (_, i) => {
      const n = i + 1;

      return `
<img
class="modal-star"
src="${icons.starGrey}"
alt="${n} star"
width="24"
height="24"
data-star="${n}"
/>`;
    }
  ).join('');

  return `
<div class="modal-rating-content">


<button
class="modal-close"
type="button"
aria-label="Close"
data-modal-close
>
<img
src="${icons.xLight}"
alt=""
width="28"
height="28"
/>
</button>
<p class="modal-rating-label">
Rating
</p>
<div class="modal-rating-row">
<span class="modal-rating-value">
0.0
</span>
<div class="modal-rating-stars">
${stars}
</div>
</div>
<form
class="modal-rating-form"
data-exercise-id="${exerciseId}"
>
<input
class="modal-rating-email"
type="email"
name="email"
placeholder="Email"
required
/>
<textarea
class="modal-rating-comment"
name="review"
placeholder="Your comment"
rows="4"
required
></textarea>
<button
class="modal-rating-submit"
type="submit"
>
Send
</button>
<p
class="modal-rating-message"
hidden
></p>
</form>
</div>`;
}
