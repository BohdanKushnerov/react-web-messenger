import { Auth, ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
// import { E164Number } from 'libphonenumber-js';

const setUpRecaptcha = (phone: string, auth: Auth): Promise<ConfirmationResult> => {
  const recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
    size: 'invisible',
    // callback: (response: unknown) => {
    //   console.log('response invisible recaptchaVerifier', response);
    // },
  });

  return signInWithPhoneNumber(auth, `+${phone}`, recaptchaVerifier);
};

export default setUpRecaptcha;