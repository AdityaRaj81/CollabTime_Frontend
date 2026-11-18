import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';
import Alert from '../../components/ui/Alert.jsx';
import SocialButtons from '../../components/auth/SocialButtons.jsx';
import CheckboxField from '../../components/forms/CheckboxField.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { logIn } from '../../services/authService.js';
import { hasErrors, isValidEmail } from '../../utils/validation.js';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { startSession } = useAuth();
  const [form, setForm] = useState({ email: '', password: '', rememberMe: false });
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
    if (!form.email.trim()) validationErrors.email = 'Please enter your email address.';
    else if (!isValidEmail(form.email)) validationErrors.email = 'Please enter a valid email address.';
    if (!form.password) validationErrors.password = 'Please enter your password.';
    setErrors(validationErrors);
    if (hasErrors(validationErrors)) return;

    setIsSubmitting(true);
    setServerError('');
    try {
      const data = await logIn({
        email: form.email.trim(),
        password: form.password,
        rememberMe: form.rememberMe,
      });
      startSession(null, data.user);
      const fallback = '/dashboard';
      navigate(location.state?.from || fallback, { replace: true });
    } catch (error) {
      setServerError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-lg sm:p-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="mt-2 text-sm text-neutral-600">Log in to continue with CollabTime.</p>
      </div>

      <div className="mt-8">
        <SocialButtons />
      </div>

      <div className="my-6 flex items-center gap-4 text-xs font-medium uppercase tracking-wider text-neutral-400">
        <span className="h-px flex-1 bg-neutral-200" />
        or log in with email
        <span className="h-px flex-1 bg-neutral-200" />
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {location.state?.passwordReset && (
          <Alert tone="success">Your password has been updated. Please log in with your new password.</Alert>
        )}
        <Alert>{serverError}</Alert>
        <Input
          id="login-email"
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
          id="login-password"
          name="password"
          type="password"
          label="Password"
          required
          autoComplete="current-password"
          value={form.password}
          onChange={updateField}
          error={errors.password}
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CheckboxField
            id="login-remember"
            checked={form.rememberMe}
            onChange={(checked) => setForm((current) => ({ ...current, rememberMe: checked }))}
          >
            Remember me
          </CheckboxField>
          <Link to="/forgot-password" className="text-sm font-semibold text-primary-700 hover:underline">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" size="lg" fullWidth isLoading={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Log In'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-600">
        New to CollabTime?{' '}
        <Link to="/signup" className="font-semibold text-primary-700 hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
