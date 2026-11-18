import { Link, useLocation } from 'react-router-dom';
import ResendVerificationForm from '../../components/auth/ResendVerificationForm.jsx';

export default function CheckEmailPage() {
  const location = useLocation();
  const email = location.state?.email || '';

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-lg sm:p-8">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary-700">
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </div>
      <h1 className="mt-5 text-2xl font-bold">Check your email</h1>
      <p className="mt-3 text-sm leading-relaxed text-neutral-600">
        We have sent a verification link to{' '}
        {email ? <span className="font-semibold text-neutral-800">{email}</span> : 'your email address'}. Open it to
        activate your account.
      </p>

      <div className="mt-8 text-left">
        <ResendVerificationForm initialEmail={email} />
      </div>

      <p className="mt-6 text-sm">
        <Link to="/login" className="font-semibold text-primary-700 hover:underline">
          Back to login
        </Link>
      </p>
    </div>
  );
}
