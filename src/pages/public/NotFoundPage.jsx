import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button.jsx';

export default function NotFoundPage() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
      <p className="font-display text-6xl font-bold text-primary-600">404</p>
      <h1 className="mt-4 text-3xl font-bold">Page not found</h1>
      <p className="mt-3 max-w-md text-neutral-600">
        The page you are looking for may have moved or no longer exists.
      </p>
      <Link to="/" className="mt-8">
        <Button>Back to home</Button>
      </Link>
    </section>
  );
}
