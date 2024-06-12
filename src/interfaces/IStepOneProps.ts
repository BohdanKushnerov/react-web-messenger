import { Dispatch, SetStateAction } from 'react';
import { ConfirmationResult } from 'firebase/auth';

import { AuthSteps } from 'types/AuthSteps';

export interface IStepOneProps {
  isLoading: boolean;
  phone: string;
  setPhone: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<AuthSteps>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setConfirmationResult: Dispatch<SetStateAction<ConfirmationResult | null>>;
}
