import { apiRequest } from './apiClient.js';

export function submitContactMessage(payload) {
  return apiRequest('/contact', { method: 'POST', body: payload, auth: false });
}
