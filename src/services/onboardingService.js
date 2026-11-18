import { apiRequest } from './apiClient.js';

export function saveOnboarding(data) {
  return apiRequest('/onboarding', { method: 'PUT', body: data });
}

export function completeOnboarding() {
  return apiRequest('/onboarding/complete', { method: 'POST' });
}

export function fetchSocialAccounts() {
  return apiRequest('/social-accounts');
}

export function startSocialConnection(platform) {
  return apiRequest(`/social-accounts/${platform}/connect`, { method: 'POST' });
}
