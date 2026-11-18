import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';
import Alert from '../../components/ui/Alert.jsx';
import { requestPasswordReset } from '../../services/authService.js';
import { isValidEmail } from '../../utils/validation.js';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [serverError, setServerError] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setServerError('');
    setIsSubmitting(true);
    try {
      await requestPasswordReset(email.trim());
      setIsSent(true);
    } catch (requestError) {
      setServerError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSent) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-lg sm:p-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success-50 text-success-600">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="mt-5 text-2xl font-bold">Check your inbox</h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600">
          If an account exists for <span className="font-semibold text-neutral-800">{email}</span>, we have sent
          a link to reset your password.
        </p>
        <Link to="/login" className="mt-8 inline-block">
          <Button variant="secondary" fullWidth>
            Back to login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-lg sm:p-8">
      <h1 className="text-2xl font-bold">Forgot your password?</h1>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600">
        Enter the email address linked to your account and we will send you a reset link.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
        <Alert>{serverError}</Alert>
        <Input
          id="forgot-email"
          type="email"
          label="Email address"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setError('');
          }}
          error={error}
        />
        <Button type="submit" size="lg" fullWidth isLoading={isSubmitting}>
          {isSubmitting ? 'Sending link...' : 'Send reset link'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm">
        <Link to="/login" className="font-semibold text-primary-700 hover:underline">
          Back to login
        </Link>
      </p>
    </div>
  );
}
