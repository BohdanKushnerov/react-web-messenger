import { Dispatch, SetStateAction } from 'react';
import { ConfirmationResult, RecaptchaVerifier } from 'firebase/auth';

import { auth } from '@myfirebase/config';
import { TFunction } from 'i18next';

import setUpRecaptcha from './setUpRecaptcha';

const getStoredConfirmResult = async (
  recaptcha: RecaptchaVerifier | null,
  setRecaptcha: Dispatch<SetStateAction<RecaptchaVerifier | null>>,
  t: TFunction<'translation', 'Auth'>
): Promise<ConfirmationResult | null> => {
  const storedPhone = localStorage.getItem('phone');

  if (storedPhone) {
    return setUpRecaptcha(storedPhone, auth, recaptcha, setRecaptcha, t);
  } else {
    return null;
  }
};

export default getStoredConfirmResult;
