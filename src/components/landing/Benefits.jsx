const BENEFITS = [
  {
    title: 'Authentic partnerships',
    description: 'Match brands with creators whose audience, content style and values already fit.',
  },
  {
    title: 'Clear creator profiles',
    description: 'Creators present their categories, languages and location in one organised profile.',
  },
  {
    title: 'Verified social data',
    description: 'Follower counts come from connected platform accounts, never from manual entries.',
  },
  {
    title: 'Flexible onboarding',
    description: 'Save your progress, skip optional steps and come back whenever it suits you.',
  },
  {
    title: 'Built for every device',
    description: 'Manage your profile and sign-up on desktop, tablet or phone with the same ease.',
  },
  {
    title: 'Privacy first',
    description: 'You decide what you share. Your information is handled under a clear privacy policy.',
  },
];

export default function Benefits() {
  return (
    <section className="bg-neutral-50 py-16 sm:py-24" aria-labelledby="benefits-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-700">Key benefits</p>
          <h2 id="benefits-heading" className="section-title mt-3">
            Why creators and brands choose CollabTime
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-2xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-md"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
                <span className="h-2.5 w-2.5 rounded-full bg-primary-600" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
