import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Button from '../../components/ui/Button.jsx';
import Alert from '../../components/ui/Alert.jsx';
import { Spinner } from '../../components/ui/Progress.jsx';
import ResendVerificationForm from '../../components/auth/ResendVerificationForm.jsx';
import { verifyEmail } from '../../services/authService.js';

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState(token ? 'verifying' : 'pending');
  const [serverError, setServerError] = useState('');
  const hasRequested = useRef(false);

  useEffect(() => {
    if (!token || hasRequested.current) return;
    hasRequested.current = true;
    verifyEmail(token)
      .then(() => setStatus('verified'))
      .catch((error) => {
        setServerError(error.message);
        setStatus('failed');
      });
  }, [token]);

  if (status === 'verifying') {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-lg" role="status">
        <div className="flex justify-center">
          <Spinner />
        </div>
        <h1 className="mt-5 text-2xl font-bold">Verifying your email</h1>
        <p className="mt-2 text-sm text-neutral-600">This will only take a moment.</p>
      </div>
    );
  }

  if (status === 'verified') {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-lg sm:p-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success-50 text-success-600">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="mt-5 text-2xl font-bold">Email verified</h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600">
          Your email address is confirmed. You can now log in to CollabTime.
        </p>
        <Link to="/login" className="mt-8 inline-block">
          <Button size="lg" fullWidth>
            Continue to login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-lg sm:p-8">
      <h1 className="text-2xl font-bold">{status === 'failed' ? 'We could not verify this link' : 'Verify your email'}</h1>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600">
        {status === 'failed'
          ? 'The link may have expired or already been used. Request a new verification email below.'
          : 'Open the verification link we sent to your inbox. Didn\u2019t get it? Request another one below.'}
      </p>
      {status === 'failed' && (
        <Alert className="mt-6">{serverError}</Alert>
      )}
      <div className="mt-8">
        <ResendVerificationForm />
      </div>
      <p className="mt-6 text-center text-sm">
        <Link to="/login" className="font-semibold text-primary-700 hover:underline">
          Back to login
        </Link>
      </p>
    </div>
  );
}
