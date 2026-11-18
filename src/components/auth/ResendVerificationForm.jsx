import { useEffect, useState } from 'react';
import Button from '../ui/Button.jsx';
import Input from '../ui/Input.jsx';
import Alert from '../ui/Alert.jsx';
import { resendVerificationEmail } from '../../services/authService.js';
import { isValidEmail } from '../../utils/validation.js';

const COOLDOWN_SECONDS = 30;

export default function ResendVerificationForm({ initialEmail = '' }) {
  const [email, setEmail] = useState(initialEmail);
  const [error, setError] = useState('');
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return undefined;
    const timer = setTimeout(() => setCooldown((seconds) => seconds - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  async function handleResend(event) {
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
    setSuccessMessage('');
    setIsSubmitting(true);
    try {
      await resendVerificationEmail(email.trim());
      setSuccessMessage('A new verification email is on its way. Please check your inbox and spam folder.');
      setCooldown(COOLDOWN_SECONDS);
    } catch (requestError) {
      setServerError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const isDisabled = isSubmitting || cooldown > 0;

  return (
    <form onSubmit={handleResend} noValidate className="space-y-5">
      <Alert tone="success">{successMessage}</Alert>
      <Alert>{serverError}</Alert>
      {!initialEmail && (
        <Input
          id="resend-email"
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
      )}
      <Button type="submit" variant="secondary" fullWidth isLoading={isSubmitting} disabled={isDisabled}>
        {cooldown > 0 ? `Resend available in ${cooldown}s` : 'Resend verification email'}
      </Button>
    </form>
  );
}
