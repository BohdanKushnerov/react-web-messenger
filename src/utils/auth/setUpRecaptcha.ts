import type { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

import { FirebaseError } from 'firebase/app';
import type { Auth, ConfirmationResult } from 'firebase/auth';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import type { TFunction } from 'i18next';

const setUpRecaptcha = async (
  phone: string,
  auth: Auth,
  recaptcha: RecaptchaVerifier | null,
  setRecaptcha: Dispatch<SetStateAction<RecaptchaVerifier | null>>,
  t: TFunction<'Auth'>
): Promise<ConfirmationResult | null> => {
  try {
    if (recaptcha) {
      return await signInWithPhoneNumber(auth, phone, recaptcha);
    }

    const recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
      size: 'invisible',
    });
    setRecaptcha(recaptchaVerifier);
    return await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'auth/invalid-phone-number':
          toast.error(t('InvalidPhoneNumber'));
          break;
        case 'auth/too-many-requests':
          toast.error(t('TooManyRequests'));
          break;
        default:
          toast.error(error.message);
      }
    }
    console.error('setUpRecaptcha', error);
    return null;
  }
};

export default setUpRecaptcha;
