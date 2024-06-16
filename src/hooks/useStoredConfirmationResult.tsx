import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import getStoredConfirmResult from '@utils/auth/getStoredConfirmResult';

import { UseStoredConfirmationResult } from 'types/hooks/UseStoredConfirmationResult';

const useStoredConfirmationResult: UseStoredConfirmationResult = (
  step,
  setConfirmationResult,
  recaptcha,
  setRecaptcha
) => {
  const { t } = useTranslation('translation', { keyPrefix: 'Auth' });

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
