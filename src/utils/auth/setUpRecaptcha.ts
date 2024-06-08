import { Auth, ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const setUpRecaptcha = (phone: string, auth: Auth): Promise<ConfirmationResult> => {
  const recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
    size: 'invisible',
  });

  return signInWithPhoneNumber(auth, `+${phone}`, recaptchaVerifier);
};

export default setUpRecaptcha;