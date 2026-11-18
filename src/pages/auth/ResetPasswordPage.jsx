import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';
import Alert from '../../components/ui/Alert.jsx';
import { resetPassword } from '../../services/authService.js';
import { getPasswordError, hasErrors } from '../../utils/validation.js';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = {};
    const passwordError = getPasswordError(form.password);
    if (passwordError) validationErrors.password = passwordError;
    if (form.confirmPassword !== form.password) validationErrors.confirmPassword = 'Passwords do not match.';
    setErrors(validationErrors);
    if (hasErrors(validationErrors)) return;

    setIsSubmitting(true);
    setServerError('');
    try {
      await resetPassword({ token, password: form.password });
      navigate('/login', { replace: true, state: { passwordReset: true } });
    } catch (error) {
      setServerError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!token) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-lg sm:p-8">
        <h1 className="text-2xl font-bold">This reset link is incomplete</h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600">
          Please open the most recent password reset link from your email, or request a new one.
        </p>
        <Link to="/forgot-password" className="mt-8 inline-block">
          <Button fullWidth>Request a new link</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-lg sm:p-8">
      <h1 className="text-2xl font-bold">Set a new password</h1>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600">
        Choose a strong password you have not used before.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
        <Alert>{serverError}</Alert>
        <Input
          id="reset-password"
          name="password"
          type="password"
          label="New password"
          required
          autoComplete="new-password"
          hint="At least 8 characters, with a letter and a number."
          value={form.password}
          onChange={updateField}
          error={errors.password}
        />
        <Input
          id="reset-confirm-password"
          name="confirmPassword"
          type="password"
          label="Confirm new password"
          required
          autoComplete="new-password"
          value={form.confirmPassword}
          onChange={updateField}
          error={errors.confirmPassword}
        />
        <Button type="submit" size="lg" fullWidth isLoading={isSubmitting}>
          {isSubmitting ? 'Updating password...' : 'Update password'}
        </Button>
      </form>
    </div>
  );
}
