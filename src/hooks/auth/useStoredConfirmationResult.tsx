import { type Dispatch, type SetStateAction, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import type { ConfirmationResult, RecaptchaVerifier } from 'firebase/auth';

import getStoredConfirmResult from '@utils/auth/getStoredConfirmResult';

import type { AuthSteps } from 'types/AuthSteps';

import { defaultNS } from '@i18n/i18n';

type UseStoredConfirmationResult = (
  step: AuthSteps,
  setConfirmationResult: Dispatch<SetStateAction<ConfirmationResult | null>>,
  recaptcha: RecaptchaVerifier | null,
  setRecaptcha: Dispatch<SetStateAction<RecaptchaVerifier | null>>
) => void;

const useStoredConfirmationResult: UseStoredConfirmationResult = (
  step,
  setConfirmationResult,
  recaptcha,
  setRecaptcha
) => {
  const { t } = useTranslation(defaultNS, { keyPrefix: 'Auth' });

  useEffect(() => {
    if (recaptcha) return;

    const fetchStoredConfirmationResult = async () => {
      if (step === 'Step 2/3') {
        const result = await getStoredConfirmResult(recaptcha, setRecaptcha, t);
        setConfirmationResult(result);

        toast.success(t('WaitingForMessage'));
      }
    };

    fetchStoredConfirmationResult();
  }, [step, recaptcha, setConfirmationResult, setRecaptcha, t]);
};

export default useStoredConfirmationResult;
