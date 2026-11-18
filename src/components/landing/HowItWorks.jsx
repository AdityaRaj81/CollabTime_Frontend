const STEPS = [
  {
    title: 'Create your account',
    description: 'Sign up with your email or social account, then choose whether you are a creator or a brand.',
  },
  {
    title: 'Tell us about yourself',
    description: 'Share your creator identity, content categories, languages and location so the right matches find you.',
  },
  {
    title: 'Connect and collaborate',
    description: 'Link your social accounts when you are ready, then start building promotional partnerships.',
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-16 sm:py-24" aria-labelledby="how-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-700">How it works</p>
          <h2 id="how-heading" className="section-title mt-3">
            Get from sign up to your first collaboration
          </h2>
        </div>

        <ol className="mt-14 grid gap-8 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="relative flex flex-col items-start rounded-2xl bg-neutral-50 p-8 transition-all duration-300 hover:bg-white hover:shadow-lg">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600 font-display text-lg font-bold text-white shadow-sm">
                {index + 1}
              </span>
              <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-neutral-600">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
