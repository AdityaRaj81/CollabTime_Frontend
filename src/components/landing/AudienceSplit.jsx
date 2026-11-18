import { Link } from 'react-router-dom';

const AUDIENCES = [
  {
    title: 'For Creators',
    accent: 'border-primary-200 hover:border-primary-400',
    badge: 'bg-primary-100 text-primary-700',
    description:
      'Build a professional presence, showcase your content categories and audience, and get discovered by brands looking for your style.',
    points: ['Set up a creator profile in minutes', 'Connect your social accounts when you are ready', 'Receive collaboration opportunities that fit you'],
    cta: 'Join as a Creator',
    to: '/signup',
  },
  {
    title: 'For Brands',
    accent: 'border-secondary-200 hover:border-secondary-400',
    badge: 'bg-secondary-100 text-secondary-700',
    description:
      'Reach real audiences through creators who already speak to your customers, with a clear view of who they are and what they cover.',
    points: ['Register your business in a few steps', 'Find creators by category, language and location', 'Run promotional collaborations with confidence'],
    cta: 'Register Your Brand',
    to: '/signup',
  },
];

export default function AudienceSplit() {
  return (
    <section className="bg-neutral-50 py-16 sm:py-24" aria-labelledby="audience-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-700">Who it is for</p>
          <h2 id="audience-heading" className="section-title mt-3">
            One platform, two sides of every collaboration
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {AUDIENCES.map((audience) => (
            <article
              key={audience.title}
              className={`group flex flex-col rounded-2xl border-2 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${audience.accent}`}
            >
              <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${audience.badge}`}>
                {audience.title}
              </span>
              <p className="mt-5 text-base leading-relaxed text-neutral-600">{audience.description}</p>
              <ul className="mt-6 space-y-3">
                {audience.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-neutral-700">
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-success-100 text-success-700">
                      <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M2.5 6.5l2 2 5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                to={audience.to}
                className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary-700 transition-all duration-200 hover:text-primary-900"
              >
                {audience.cta}
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
