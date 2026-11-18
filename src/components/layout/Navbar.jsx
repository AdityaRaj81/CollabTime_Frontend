import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from '../ui/Logo.jsx';
import Button from '../ui/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 hover:text-primary-700 ${
      isActive ? 'text-primary-700' : 'text-neutral-600'
    }`;

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-all duration-300 ${
        isScrolled
          ? 'border-neutral-200 bg-white/95 shadow-sm backdrop-blur'
          : 'border-transparent bg-white'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <Link to="/onboarding/1">
              <Button size="md">Continue Onboarding</Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="md">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="md">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-neutral-700 transition-colors hover:bg-neutral-100 md:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div id="mobile-menu" className="animate-fade-in border-t border-neutral-200 bg-white md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-base font-medium ${
                    isActive ? 'bg-primary-50 text-primary-700' : 'text-neutral-700 hover:bg-neutral-100'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-3">
              {isAuthenticated ? (
                <Link to="/onboarding/1" className="col-span-2">
                  <Button fullWidth>Continue Onboarding</Button>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="secondary" fullWidth>
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button fullWidth>Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
