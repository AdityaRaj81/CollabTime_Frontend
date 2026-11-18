import { Link } from 'react-router-dom';
import Button from '../ui/Button.jsx';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute inset-x-0 -top-40 -z-0 h-96 bg-gradient-to-b from-primary-100/80 via-white to-white"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-700">
            Creator and brand collaborations
          </span>
          <h1 className="mt-6 text-4xl font-bold sm:text-5xl lg:text-6xl">
            Where creators and brands <span className="text-primary-600">build things together</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            CollabTime helps social media creators establish their presence and gives businesses a simple
            way to find creators for promotional collaborations that feel genuine.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Sign Up Free
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Login
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative animate-fade-up [animation-delay:150ms]">
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-primary-100/60 blur-2xl" aria-hidden="true" />
          <img
            src="https://images.pexels.com/photos/6593779/pexels-photo-6593779.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="A creator filming a vlog at home with a smartphone and ring light"
            width="940"
            height="650"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-xl ring-1 ring-neutral-200"
          />
        </div>
      </div>
    </section>
  );
}
