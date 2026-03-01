const BASE_URL = 'https://your-energy.b.goit.study/api';

class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async request(endpoint, options = {}) {
    const url = this.baseUrl + endpoint;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw await this.handleError(response);
    }

    if (response.status === 204) return null;

    return response.json();
  }

  async handleError(response) {
    let message = `HTTP ${response.status}`;

    try {
      const data = await response.json();

      if (data?.message) message = data.message;
    } catch {}

    const error = new Error(message);

    error.status = response.status;

    return error;
  }

  get(endpoint, params = {}) {
    const query = new URLSearchParams(params).toString();

    const url = query ? `${endpoint}?${query}` : endpoint;

    return this.request(url);
  }

  post(endpoint, body) {
    return this.request(endpoint, {
      method: 'POST',

      body: JSON.stringify(body),
    });
  }

  patch(endpoint, body) {
    return this.request(endpoint, {
      method: 'PATCH',

      body: JSON.stringify(body),
    });
  }
}

const api = new ApiClient(BASE_URL);


export function getQuote() {
  return api.get('/quote');
}

export function getFilters(filter, page = 1, limit = 12) {
  return api.get('/filters', {
    filter,
    page,
    limit,
  });
}

export function getExercises(params = {}) {
  return api.get('/exercises', params);
}

export function getExerciseById(id) {
  return api.get(`/exercises/${id}`);
}

export function patchExerciseRating(id, body) {
  return api.patch(`/exercises/${id}/rating`, body);
}

export function postSubscription(email) {
  return api.post('/subscription', { email });
}
