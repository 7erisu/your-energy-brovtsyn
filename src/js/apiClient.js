class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async request(endpoint, options = {}) {
    const response = await fetch(this.baseUrl + endpoint, options);

    if (!response.ok) {
      const error = await this.parseError(response);

      throw error;
    }

    return response.json();
  }

  async parseError(response) {
    try {
      const data = await response.json();

      return new Error(data.message);
    } catch {
      return new Error(`HTTP ${response.status}`);
    }
  }
}

export const api = new ApiClient('https://your-energy.b.goit.study/api');
