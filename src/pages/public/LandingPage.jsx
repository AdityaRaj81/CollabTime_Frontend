import { Link } from 'react-router-dom';
import Hero from '../../components/landing/Hero.jsx';
import AudienceSplit from '../../components/landing/AudienceSplit.jsx';
import HowItWorks from '../../components/landing/HowItWorks.jsx';
import Benefits from '../../components/landing/Benefits.jsx';
import Button from '../../components/ui/Button.jsx';

export default function LandingPage() {
  return (
    <>
      <Hero />
      <AudienceSplit />
      <HowItWorks />
      <Benefits />
      <section className="bg-primary-700 py-16 sm:py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Ready to start your next collaboration?
          </h2>
          <p className="mt-4 max-w-xl text-base text-primary-100">
            Create your free account today and take the first step towards meaningful partnerships.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/signup">
              <Button size="lg" className="w-full bg-white text-primary-800 hover:bg-primary-50 sm:w-auto">
                Sign Up
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="ghost" className="w-full text-white hover:bg-primary-600 hover:text-white sm:w-auto">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
