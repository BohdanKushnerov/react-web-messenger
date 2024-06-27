import type { Dispatch, SetStateAction } from 'react';

import type { ConfirmationResult, RecaptchaVerifier } from 'firebase/auth';
import type { TFunction } from 'i18next';

import setUpRecaptcha from './setUpRecaptcha';

import { auth } from '@myfirebase/config';

const getStoredConfirmResult = async (
  recaptcha: RecaptchaVerifier | null,
  setRecaptcha: Dispatch<SetStateAction<RecaptchaVerifier | null>>,
  t: TFunction<'Auth'>
): Promise<ConfirmationResult | null> => {
  const storedPhone = localStorage.getItem('phone');

  if (storedPhone) {
    return setUpRecaptcha(storedPhone, auth, recaptcha, setRecaptcha, t);
  }

  return null;
};

export default getStoredConfirmResult;
