import { Dispatch, SetStateAction } from 'react';

import { ConfirmationResult, RecaptchaVerifier } from 'firebase/auth';

export interface IStepTwoProps {
  phone: string;
  recaptcha: RecaptchaVerifier | null;
  setCode: Dispatch<SetStateAction<string>>;
  setConfirmationResult: Dispatch<SetStateAction<ConfirmationResult | null>>;
  setRecaptcha: Dispatch<SetStateAction<RecaptchaVerifier | null>>;
}
