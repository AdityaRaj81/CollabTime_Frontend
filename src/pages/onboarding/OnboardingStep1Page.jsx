import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button.jsx';
import Alert from '../../components/ui/Alert.jsx';
import { ProgressSteps } from '../../components/ui/Progress.jsx';
import { ChoiceCards } from '../../components/forms/ChoiceControls.jsx';
import { CREATOR_TYPES } from '../../constants/onboardingOptions.js';
import { useOnboardingDraft } from '../../hooks/useOnboardingDraft.js';
import { saveOnboarding } from '../../services/onboardingService.js';
import { ONBOARDING_STEPS } from './onboardingSteps.js';

export default function OnboardingStep1Page() {
  const navigate = useNavigate();
  const [draft, updateDraft] = useOnboardingDraft();
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  async function handleNext() {
    if (!draft.creatorType) {
      setError('Please choose the option that best describes you.');
      return;
    }
    setIsSaving(true);
    setError('');
    try {
      await saveOnboarding(draft);
      navigate('/onboarding/2');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="animate-fade-up">
      <ProgressSteps steps={ONBOARDING_STEPS} currentIndex={0} />
      <h1 className="text-3xl font-bold">What best describes you?</h1>
      <p className="mt-3 text-neutral-600">Pick the option that fits you most. You can always update this later.</p>

      <div className="mt-8">
        <ChoiceCards
          name="creatorType"
          options={CREATOR_TYPES}
          value={draft.creatorType}
          onChange={(value) => {
            updateDraft({ creatorType: value });
            setError('');
          }}
        />
      </div>

      <Alert className="mt-6">{error}</Alert>

      <div className="mt-10 flex justify-end">
        <Button size="lg" onClick={handleNext} isLoading={isSaving}>
          {isSaving ? 'Saving...' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
