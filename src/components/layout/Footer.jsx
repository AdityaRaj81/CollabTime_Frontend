import { Link } from 'react-router-dom';
import Logo from '../ui/Logo.jsx';

const FOOTER_LINKS = [
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact Us' },
  { to: '/terms', label: 'Terms & Conditions' },
  { to: '/privacy', label: 'Privacy Policy' },
];

const ACCOUNT_LINKS = [
  { to: '/signup', label: 'Sign Up' },
  { to: '/login', label: 'Login' },
];

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-900 text-neutral-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-400">
            CollabTime connects social media creators with brands for promotional collaborations that
            feel authentic.
          </p>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Company</h2>
          <ul className="mt-4 space-y-3">
            {FOOTER_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-sm text-neutral-400 transition-colors hover:text-primary-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Get started</h2>
          <ul className="mt-4 space-y-3">
            {ACCOUNT_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-sm text-neutral-400 transition-colors hover:text-primary-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-neutral-800">
        <p className="mx-auto max-w-7xl px-4 py-6 text-sm text-neutral-500 sm:px-6 lg:px-8">
          &copy; {new Date().getFullYear()} CollabTime. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
