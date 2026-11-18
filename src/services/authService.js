import { apiRequest } from './apiClient.js';

export function signUp(payload) {
  return apiRequest('/auth/signup', { method: 'POST', body: payload, auth: false }).then((response) => response.data);
}

export function logIn({ email, password }) {
  return apiRequest('/auth/login', { method: 'POST', body: { email, password }, auth: false }).then((response) => response.data);
}

export function verifyEmail(token) {
  return apiRequest('/auth/verify-email', { method: 'POST', body: { token }, auth: false });
}

export function fetchCurrentUser() {
  return apiRequest('/users/me').then((response) => response.data);
}

export function logOut() {
  return apiRequest('/auth/logout', { method: 'POST' });
}

export function requestPasswordReset() {
  return Promise.reject(new Error('Password reset is not available in this phase.'));
}

export function resetPassword() {
  return Promise.reject(new Error('Password reset is not available in this phase.'));
}

export function resendVerificationEmail() {
  return Promise.reject(new Error('Verification email resend is not available in this phase.'));
}
