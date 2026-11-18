import { useCallback, useState } from 'react';

const DRAFT_KEY = 'collabtime_onboarding_draft';

const EMPTY_DRAFT = {
  creatorType: '',
  primaryCategory: '',
  secondaryCategories: [],
  languages: [],
  country: '',
  state: '',
  city: '',
};

function readDraft() {
  try {
    const stored = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null');
    return stored ? { ...EMPTY_DRAFT, ...stored } : EMPTY_DRAFT;
  } catch {
    return EMPTY_DRAFT;
  }
}

export function useOnboardingDraft() {
  const [draft, setDraft] = useState(readDraft);

  const updateDraft = useCallback((patch) => {
    setDraft((current) => {
      const next = { ...current, ...patch };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return [draft, updateDraft];
}
