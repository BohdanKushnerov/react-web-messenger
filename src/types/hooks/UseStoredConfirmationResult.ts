import type { Dispatch, SetStateAction } from 'react';

import type { ConfirmationResult, RecaptchaVerifier } from 'firebase/auth';

import type { AuthSteps } from 'types/AuthSteps';

export type UseStoredConfirmationResult = (
  step: AuthSteps,
  setConfirmationResult: Dispatch<SetStateAction<ConfirmationResult | null>>,
  recaptcha: RecaptchaVerifier | null,
  setRecaptcha: Dispatch<SetStateAction<RecaptchaVerifier | null>>
) => void;
