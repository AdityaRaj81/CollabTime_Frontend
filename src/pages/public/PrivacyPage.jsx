export default function PrivacyPage() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <article className="mx-auto max-w-3xl space-y-8 px-4 sm:px-6 lg:px-8">
        <header>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-700">Legal</p>
          <h1 className="mt-3 text-4xl font-bold">Privacy Policy</h1>
        </header>
        <div className="space-y-6 leading-relaxed text-neutral-600">
          <section>
            <h2 className="text-xl font-bold text-neutral-900">1. Information we collect</h2>
            <p className="mt-2">
              We collect the details you give us when you sign up and complete onboarding, such as your name,
              contact details, content categories, languages and location. If you connect a social media account, we
              receive the profile information that the platform permits.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-neutral-900">2. How we use information</h2>
            <p className="mt-2">
              We use your information to run your account, show your profile to relevant brands, communicate with you
              about your account and improve the platform.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-neutral-900">3. Sharing</h2>
            <p className="mt-2">
              We do not sell your personal information. We share data only with service providers that help us run
              CollabTime, or where the law requires it.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-neutral-900">4. Your choices</h2>
            <p className="mt-2">
              You can update your details, disconnect social accounts or ask us to delete your account by contacting
              us through the Contact page.
            </p>
          </section>
        </div>
      </article>
    </section>
  );
}
