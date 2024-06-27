import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import getStoredConfirmResult from '@utils/auth/getStoredConfirmResult';

import type { UseStoredConfirmationResult } from 'types/hooks/UseStoredConfirmationResult';

import { defaultNS } from '@i18n/i18n';

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
      }
    };

    fetchStoredConfirmationResult();
  }, [step, recaptcha, setConfirmationResult, setRecaptcha, t]);
};

export default useStoredConfirmationResult;
