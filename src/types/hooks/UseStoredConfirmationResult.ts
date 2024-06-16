import { Dispatch, SetStateAction } from 'react';

import { ConfirmationResult, RecaptchaVerifier } from 'firebase/auth';

import { AuthSteps } from 'types/AuthSteps';

export type UseStoredConfirmationResult = (
  step: AuthSteps,
  setConfirmationResult: Dispatch<SetStateAction<ConfirmationResult | null>>,
  recaptcha: RecaptchaVerifier | null,
  setRecaptcha: Dispatch<SetStateAction<RecaptchaVerifier | null>>
) => void;
