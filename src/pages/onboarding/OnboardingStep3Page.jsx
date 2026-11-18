import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button.jsx';
import Alert from '../../components/ui/Alert.jsx';
import { ProgressSteps, Spinner } from '../../components/ui/Progress.jsx';
import { fetchSocialAccounts, startSocialConnection } from '../../services/onboardingService.js';
import { ONBOARDING_STEPS } from './onboardingSteps.js';

const PLATFORMS = [
  { id: 'instagram', label: 'Instagram' },
  { id: 'facebook', label: 'Facebook' },
  { id: 'youtube', label: 'YouTube' },
];

export default function OnboardingStep3Page() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [connectingId, setConnectingId] = useState('');
  const [actionError, setActionError] = useState('');

  useEffect(() => {
    let active = true;
    fetchSocialAccounts()
      .then((list) => {
        if (!active) return;
        const byPlatform = {};
        (Array.isArray(list) ? list : []).forEach((account) => {
          byPlatform[account.platform] = account;
        });
        setAccounts(byPlatform);
      })
      .catch((error) => {
        if (active) setLoadError(error.message);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function handleConnect(platformId) {
    setConnectingId(platformId);
    setActionError('');
    try {
      const { url } = await startSocialConnection(platformId);
      window.location.assign(url);
    } catch (error) {
      setActionError(error.message);
      setConnectingId('');
    }
  }

  return (
    <div className="animate-fade-up">
      <ProgressSteps steps={ONBOARDING_STEPS} currentIndex={2} />
      <h1 className="text-3xl font-bold">Connect your social accounts</h1>
      <p className="mt-3 text-neutral-600">
        Connecting is optional for now. Follower counts are shown only when they come directly from the platform.
      </p>

      <Alert className="mt-6">{loadError}</Alert>
      <Alert className="mt-6">{actionError}</Alert>

      <ul className="mt-8 space-y-4">
        {PLATFORMS.map((platform) => {
          const account = accounts[platform.id];
          const isConnected = Boolean(account?.connected);
          return (
            <li
              key={platform.id}
              className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-neutral-900">{platform.label}</p>
                {isLoading ? (
                  <p className="mt-1 text-sm text-neutral-500">Checking connection...</p>
                ) : isConnected ? (
                  <p className="mt-1 text-sm text-success-700">
                    Connected as {account.accountName}
                    {typeof account.followerCount === 'number' &&
                      ` · ${account.followerCount.toLocaleString()} followers`}
                  </p>
                ) : (
                  <p className="mt-1 text-sm text-neutral-500">Not connected</p>
                )}
              </div>
              {!isLoading && !isConnected && (
                <Button
                  variant="outline"
                  onClick={() => handleConnect(platform.id)}
                  isLoading={connectingId === platform.id}
                  disabled={Boolean(connectingId) || Boolean(loadError)}
                >
                  Connect Account
                </Button>
              )}
              {isLoading && <Spinner className="h-5 w-5" />}
            </li>
          );
        })}
      </ul>

      <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button variant="secondary" size="lg" onClick={() => navigate('/onboarding/2')}>
          Back
        </Button>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="ghost" size="lg" onClick={() => navigate('/onboarding/complete')}>
            Skip for Now
          </Button>
          <Button size="lg" onClick={() => navigate('/onboarding/complete')}>
            Finish
          </Button>
        </div>
      </div>
    </div>
  );
}
