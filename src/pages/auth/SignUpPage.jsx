import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CreatorSignUpForm from '../../components/auth/CreatorSignUpForm.jsx';
import SocialButtons from '../../components/auth/SocialButtons.jsx';
import { signUp } from '../../services/authService.js';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSignUp(payload) {
    setIsSubmitting(true);
    setServerError('');
    try {
      await signUp(payload);
      navigate('/check-email', { replace: true, state: { email: payload.email } });
    } catch (error) {
      setServerError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-lg sm:p-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="mt-2 text-sm text-neutral-600">Create your creator account to get started.</p>
      </div>

      <div className="mt-6">
        <SocialButtons accountType="creator" />
      </div>

      <div className="my-6 flex items-center gap-4 text-xs font-medium uppercase tracking-wider text-neutral-400">
        <span className="h-px flex-1 bg-neutral-200" />
        or register with details
        <span className="h-px flex-1 bg-neutral-200" />
      </div>

      <CreatorSignUpForm onSubmit={handleSignUp} isSubmitting={isSubmitting} serverError={serverError} />

      <p className="mt-6 text-center text-sm text-neutral-600">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-primary-700 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
