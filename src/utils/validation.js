const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[0-9\s-]{7,15}$/;

export function isValidEmail(value) {
  return EMAIL_PATTERN.test(value.trim());
}

export function isValidPhone(value) {
  return PHONE_PATTERN.test(value.trim());
}

export function getPasswordError(value) {
  if (value.length < 8) return 'Password must be at least 8 characters.';
  if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value)) {
    return 'Password must include at least one letter and one number.';
  }
  return '';
}

export function validateContactForm({ name, email, subject, message }) {
  const errors = {};
  if (!name.trim()) errors.name = 'Please enter your name.';
  if (!email.trim()) errors.email = 'Please enter your email address.';
  else if (!isValidEmail(email)) errors.email = 'Please enter a valid email address.';
  if (!subject.trim()) errors.subject = 'Please enter a subject.';
  if (!message.trim()) errors.message = 'Please write a message.';
  else if (message.trim().length < 10) errors.message = 'Your message should be at least 10 characters.';
  return errors;
}

export function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}
