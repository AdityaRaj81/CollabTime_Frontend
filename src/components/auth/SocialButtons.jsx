import { getApiBaseUrl } from '../../services/apiClient.js';

const PROVIDERS = [
  { id: 'google', label: 'Google', badgeClass: 'text-[#4285F4]', glyph: 'G' },
  { id: 'facebook', label: 'Facebook', badgeClass: 'text-[#1877F2]', glyph: 'f' },
];

export default function SocialButtons({ accountType }) {
  function startProvider(providerId) {
    const query = accountType ? `?accountType=${encodeURIComponent(accountType)}` : '';
    window.location.assign(`${getApiBaseUrl()}/auth/${providerId}${query}`);
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {PROVIDERS.map((provider) => (
        <button
          key={provider.id}
          type="button"
          onClick={() => startProvider(provider.id)}
          className="flex h-11 items-center justify-center gap-3 rounded-lg border border-neutral-300 bg-white text-sm font-semibold text-neutral-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-400 hover:shadow-md"
        >
          <span className={`flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100 text-sm font-bold ${provider.badgeClass}`} aria-hidden="true">
            {provider.glyph}
          </span>
          Continue with {provider.label}
        </button>
      ))}
    </div>
  );
}
