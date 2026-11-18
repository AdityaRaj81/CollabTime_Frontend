const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export function getStoredToken() {
  return null;
}

export function storeToken(token) {
  return token;
}

export function getApiBaseUrl() {
  return API_BASE_URL;
}

export async function apiRequest(path, { method = 'GET', body, auth = true } = {}) {
  const headers = { Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      credentials: 'include',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError('We could not reach the CollabTime server. Please check your connection and try again.', 0);
  }

  let data = null;
  const text = await response.text();
  if (text) {
    try { data = JSON.parse(text); } catch { data = null; }
  }
  if (!response.ok) {
    const message = data?.message;
    throw new ApiError(Array.isArray(message) ? message.join(' ') : message || 'Something went wrong. Please try again.', response.status);
  }
  return data;
}
