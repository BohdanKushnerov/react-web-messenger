import { Dispatch, SetStateAction } from 'react';
import { ConfirmationResult } from 'firebase/auth';

import { AuthSteps } from 'types/AuthSteps';

export interface IStepTwoProps {
  phone: string;
  isLoading: boolean;
  confirmationResult: ConfirmationResult | null;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setStep: Dispatch<SetStateAction<AuthSteps>>;
  setConfirmationResult: Dispatch<SetStateAction<ConfirmationResult | null>>;
}
