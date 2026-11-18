import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button.jsx';
import Input from '../ui/Input.jsx';
import Alert from '../ui/Alert.jsx';
import CheckboxField from '../forms/CheckboxField.jsx';
import { getPasswordError, hasErrors, isValidEmail, isValidPhone } from '../../utils/validation.js';

const EMPTY_FORM = { fullName: '', email: '', phone: '', password: '', confirmPassword: '', acceptTerms: false };

function validate(form) {
  const errors = {};
  if (!form.fullName.trim()) errors.fullName = 'Please enter your full name.';
  if (!form.email.trim()) errors.email = 'Please enter your email address.';
  else if (!isValidEmail(form.email)) errors.email = 'Please enter a valid email address.';
  if (form.phone.trim() && !isValidPhone(form.phone)) errors.phone = 'Please enter a valid phone number.';
  const passwordError = getPasswordError(form.password);
  if (passwordError) errors.password = passwordError;
  if (form.confirmPassword !== form.password) errors.confirmPassword = 'Passwords do not match.';
  if (!form.acceptTerms) errors.acceptTerms = 'Please accept the Terms & Conditions and Privacy Policy.';
  return errors;
}

export default function CreatorSignUpForm({ onSubmit, isSubmitting, serverError }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (hasErrors(validationErrors)) return;
    onSubmit({
      accountType: 'creator',
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phoneNumber: form.phone.trim() || undefined,
      password: form.password,
      termsAccepted: form.acceptTerms,
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <Alert>{serverError}</Alert>
      <Input
        id="creator-full-name"
        name="fullName"
        label="Full name"
        required
        autoComplete="name"
        value={form.fullName}
        onChange={updateField}
        error={errors.fullName}
      />
      <Input
        id="creator-email"
        name="email"
        type="email"
        label="Email address"
        required
        autoComplete="email"
        value={form.email}
        onChange={updateField}
        error={errors.email}
      />
      <Input
        id="creator-phone"
        name="phone"
        type="tel"
        label="Phone number"
        autoComplete="tel"
        value={form.phone}
        onChange={updateField}
        error={errors.phone}
      />
      <Input
        id="creator-password"
        name="password"
        type="password"
        label="Password"
        required
        autoComplete="new-password"
        hint="At least 8 characters, with a letter and a number."
        value={form.password}
        onChange={updateField}
        error={errors.password}
      />
      <Input
        id="creator-confirm-password"
        name="confirmPassword"
        type="password"
        label="Confirm password"
        required
        autoComplete="new-password"
        value={form.confirmPassword}
        onChange={updateField}
        error={errors.confirmPassword}
      />
      <CheckboxField
        id="creator-terms"
        checked={form.acceptTerms}
        error={errors.acceptTerms}
        onChange={(checked) => {
          setForm((current) => ({ ...current, acceptTerms: checked }));
          setErrors((current) => ({ ...current, acceptTerms: undefined }));
        }}
      >
        I agree to the{' '}
        <Link to="/terms" className="font-semibold text-primary-700 hover:underline">
          Terms &amp; Conditions
        </Link>{' '}
        and{' '}
        <Link to="/privacy" className="font-semibold text-primary-700 hover:underline">
          Privacy Policy
        </Link>
        .
      </CheckboxField>
      <Button type="submit" size="lg" fullWidth isLoading={isSubmitting}>
        {isSubmitting ? 'Creating account...' : 'Create Account'}
      </Button>
    </form>
  );
}
