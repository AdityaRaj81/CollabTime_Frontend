import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button.jsx';
import Input from '../ui/Input.jsx';
import Alert from '../ui/Alert.jsx';
import CheckboxField from '../forms/CheckboxField.jsx';
import { getPasswordError, hasErrors, isValidEmail } from '../../utils/validation.js';

const EMPTY_FORM = {
  businessName: '',
  contactName: '',
  businessEmail: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
};

function validate(form) {
  const errors = {};
  if (!form.businessName.trim()) errors.businessName = 'Please enter your brand or business name.';
  if (!form.contactName.trim()) errors.contactName = 'Please enter the contact person\u2019s name.';
  if (!form.businessEmail.trim()) errors.businessEmail = 'Please enter your business email address.';
  else if (!isValidEmail(form.businessEmail)) errors.businessEmail = 'Please enter a valid email address.';
  const passwordError = getPasswordError(form.password);
  if (passwordError) errors.password = passwordError;
  if (form.confirmPassword !== form.password) errors.confirmPassword = 'Passwords do not match.';
  if (!form.acceptTerms) errors.acceptTerms = 'Please accept the Terms & Conditions and Privacy Policy.';
  return errors;
}

export default function BrandSignUpForm({ onSubmit, isSubmitting, serverError }) {
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
      accountType: 'brand',
      businessName: form.businessName.trim(),
      contactName: form.contactName.trim(),
      email: form.businessEmail.trim(),
      password: form.password,
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <Alert>{serverError}</Alert>
      <Input
        id="brand-name"
        name="businessName"
        label="Brand / business name"
        required
        autoComplete="organization"
        value={form.businessName}
        onChange={updateField}
        error={errors.businessName}
      />
      <Input
        id="brand-contact-name"
        name="contactName"
        label="Contact person's name"
        required
        autoComplete="name"
        value={form.contactName}
        onChange={updateField}
        error={errors.contactName}
      />
      <Input
        id="brand-email"
        name="businessEmail"
        type="email"
        label="Business email"
        required
        autoComplete="email"
        value={form.businessEmail}
        onChange={updateField}
        error={errors.businessEmail}
      />
      <Input
        id="brand-password"
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
        id="brand-confirm-password"
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
        id="brand-terms"
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
        {isSubmitting ? 'Creating account...' : 'Register Brand'}
      </Button>
    </form>
  );
}
