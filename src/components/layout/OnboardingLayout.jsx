import { Link, Outlet } from 'react-router-dom';
import Logo from '../ui/Logo.jsx';

export default function OnboardingLayout() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <Link to="/" className="text-sm font-medium text-neutral-600 transition-colors hover:text-primary-700">
            Save and exit
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <Outlet />
      </main>
    </div>
  );
}
