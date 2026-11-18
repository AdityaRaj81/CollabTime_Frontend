import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button.jsx';
import Alert from '../../components/ui/Alert.jsx';
import { Spinner } from '../../components/ui/Progress.jsx';
import { completeOnboarding } from '../../services/onboardingService.js';

export default function OnboardingCompletePage() {
  const [status, setStatus] = useState('saving');
  const [serverError, setServerError] = useState('');
  const hasSubmitted = useRef(false);

  useEffect(() => {
    if (hasSubmitted.current) return;
    hasSubmitted.current = true;
    completeOnboarding()
      .then(() => setStatus('done'))
      .catch((error) => {
        setServerError(error.message);
        setStatus('failed');
      });
  }, []);

  if (status === 'saving') {
    return (
      <div className="flex flex-col items-center py-20 text-center" role="status">
        <Spinner />
        <p className="mt-4 text-neutral-600">Finishing your registration...</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="animate-fade-up text-center">
        <h1 className="text-3xl font-bold">We could not finish registration</h1>
        <Alert className="mt-6 text-left">{serverError}</Alert>
        <p className="mt-4 text-neutral-600">Your answers are saved on this device. Please try again.</p>
        <div className="mt-8">
          <Button size="lg" onClick={() => window.location.reload()}>
            Try again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-up text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-50 text-success-600">
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="mt-6 text-3xl font-bold">You are all set</h1>
      <p className="mx-auto mt-3 max-w-md text-neutral-600">
        Your creator profile is complete. You can connect social accounts or update your details at any time from
        your profile settings.
      </p>
      <Link to="/" className="mt-8 inline-block">
        <Button size="lg">Go to home page</Button>
      </Link>
    </div>
  );
}
