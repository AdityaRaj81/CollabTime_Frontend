export default function TermsPage() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <article className="mx-auto max-w-3xl space-y-8 px-4 sm:px-6 lg:px-8">
        <header>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-700">Legal</p>
          <h1 className="mt-3 text-4xl font-bold">Terms &amp; Conditions</h1>
        </header>
        <div className="space-y-6 leading-relaxed text-neutral-600">
          <section>
            <h2 className="text-xl font-bold text-neutral-900">1. Acceptance of terms</h2>
            <p className="mt-2">
              By creating an account or using CollabTime, you agree to these terms. If you do not agree, please do
              not use the platform.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-neutral-900">2. Accounts</h2>
            <p className="mt-2">
              You are responsible for keeping your login details secure and for the accuracy of the information you
              provide. Creators and brands must provide truthful details about themselves and their businesses.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-neutral-900">3. Social media connections</h2>
            <p className="mt-2">
              When you connect a social media account, you authorise CollabTime to read the profile information
              that the platform allows. You can disconnect accounts at any time.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-neutral-900">4. Acceptable use</h2>
            <p className="mt-2">
              You must not misrepresent your identity, follower counts or business, or use the platform for unlawful
              or abusive activity.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-neutral-900">5. Changes</h2>
            <p className="mt-2">
              We may update these terms from time to time. Continued use of CollabTime after changes means you accept
              the updated terms.
            </p>
          </section>
        </div>
      </article>
    </section>
  );
}
