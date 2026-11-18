import { Outlet } from 'react-router-dom';
import Logo from '../ui/Logo.jsx';

export default function AuthLayout() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-gradient-to-b from-primary-100/70 to-transparent"
        aria-hidden="true"
      />
      <div className="mb-8">
        <Logo />
      </div>
      <div className="w-full max-w-md animate-fade-up">
        <Outlet />
      </div>
    </div>
  );
}
