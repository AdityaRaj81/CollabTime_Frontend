export default function AboutPage() {
  return (
    <>
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-700">About us</p>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Helping creators and brands grow together</h1>
          <p className="mt-6 text-lg leading-relaxed text-neutral-600">
            CollabTime is a web platform that connects social media creators and influencers with brands and
            businesses. We believe the best promotions come from genuine relationships between people who
            already understand each other's audience.
          </p>
        </div>
      </section>

      <section className="bg-neutral-50 py-16 sm:py-20">
        <div className="mx-auto grid max-w-4xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <article className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Our purpose</h2>
            <p className="mt-4 leading-relaxed text-neutral-600">
              Creators should be able to establish a professional presence without needing an agency. Businesses
              should be able to find the right voices for their products without guesswork.
            </p>
          </article>
          <article className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Our mission</h2>
            <p className="mt-4 leading-relaxed text-neutral-600">
              To make promotional collaborations transparent, fair and easy to start, with honest profiles and
              verified platform information at the centre of every match.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
