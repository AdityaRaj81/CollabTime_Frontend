import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';
import Alert from '../../components/ui/Alert.jsx';
import { ProgressSteps } from '../../components/ui/Progress.jsx';
import SearchableSelect from '../../components/forms/SearchableSelect.jsx';
import { ChipMultiSelect } from '../../components/forms/ChoiceControls.jsx';
import {
  CONTENT_CATEGORIES,
  CONTENT_LANGUAGES,
  COUNTRIES,
  STATES_BY_COUNTRY,
} from '../../constants/onboardingOptions.js';
import { useOnboardingDraft } from '../../hooks/useOnboardingDraft.js';
import { saveOnboarding } from '../../services/onboardingService.js';
import { ONBOARDING_STEPS } from './onboardingSteps.js';

const MAX_SECONDARY_CATEGORIES = 5;

function validate(draft) {
  const errors = {};
  if (!draft.primaryCategory) errors.primaryCategory = 'Please choose your primary content category.';
  if (draft.languages.length === 0) errors.languages = 'Please choose at least one content language.';
  if (!draft.country) errors.country = 'Please choose your country.';
  return errors;
}

export default function OnboardingStep2Page() {
  const navigate = useNavigate();
  const [draft, updateDraft] = useOnboardingDraft();
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const stateOptions = STATES_BY_COUNTRY[draft.country];
  const secondaryOptions = CONTENT_CATEGORIES.filter((category) => category !== draft.primaryCategory);

  function clearError(field) {
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleNext() {
    const validationErrors = validate(draft);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSaving(true);
    setServerError('');
    try {
      await saveOnboarding(draft);
      navigate('/onboarding/3');
    } catch (requestError) {
      setServerError(requestError.message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="animate-fade-up">
      <ProgressSteps steps={ONBOARDING_STEPS} currentIndex={1} />
      <h1 className="text-3xl font-bold">Tell us about your content</h1>
      <p className="mt-3 text-neutral-600">This helps brands find you for the right collaborations.</p>

      <div className="mt-8 space-y-8">
        <SearchableSelect
          id="primary-category"
          label="Primary content category"
          required
          placeholder="Search categories"
          options={CONTENT_CATEGORIES}
          value={draft.primaryCategory}
          error={errors.primaryCategory}
          onChange={(value) => {
            updateDraft({
              primaryCategory: value,
              secondaryCategories: draft.secondaryCategories.filter((item) => item !== value),
            });
            clearError('primaryCategory');
          }}
        />

        <ChipMultiSelect
          id="secondary-categories"
          label="Secondary content categories"
          options={secondaryOptions}
          values={draft.secondaryCategories}
          max={MAX_SECONDARY_CATEGORIES}
          hint={`Choose up to ${MAX_SECONDARY_CATEGORIES}.`}
          onChange={(values) => updateDraft({ secondaryCategories: values })}
        />

        <ChipMultiSelect
          id="content-languages"
          label="Content languages"
          required
          options={CONTENT_LANGUAGES}
          values={draft.languages}
          error={errors.languages}
          onChange={(values) => {
            updateDraft({ languages: values });
            clearError('languages');
          }}
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <SearchableSelect
            id="country"
            label="Country"
            required
            placeholder="Search countries"
            options={COUNTRIES}
            value={draft.country}
            error={errors.country}
            onChange={(value) => {
              updateDraft({ country: value, state: '' });
              clearError('country');
            }}
          />

          {stateOptions ? (
            <SearchableSelect
              id="state"
              label="State"
              placeholder="Search states"
              options={stateOptions}
              value={draft.state}
              onChange={(value) => updateDraft({ state: value })}
            />
          ) : (
            <Input
              id="state-text"
              label="State or region"
              value={draft.state}
              onChange={(event) => updateDraft({ state: event.target.value })}
            />
          )}
        </div>

        <Input
          id="city"
          label="City"
          value={draft.city}
          onChange={(event) => updateDraft({ city: event.target.value })}
        />
      </div>

      <Alert className="mt-6">{serverError}</Alert>

      <div className="mt-10 flex items-center justify-between gap-3">
        <Button variant="secondary" size="lg" onClick={() => navigate('/onboarding/1')}>
          Back
        </Button>
        <Button size="lg" onClick={handleNext} isLoading={isSaving}>
          {isSaving ? 'Saving...' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
