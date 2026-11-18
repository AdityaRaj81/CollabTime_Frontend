import { Link } from 'react-router-dom';

export default function Logo({ to = '/', light = false, className = '' }) {
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-2 font-display text-xl font-bold tracking-tight ${
        light ? 'text-white' : 'text-neutral-900'
      } ${className}`}
      aria-label="CollabTime home"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-sm font-bold text-white transition-transform duration-300 group-hover:rotate-6">
        C
      </span>
      <span>
        Collab<span className="text-primary-600">Time</span>
      </span>
    </Link>
  );
}
