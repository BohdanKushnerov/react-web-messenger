import { Auth, ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { E164Number } from 'libphonenumber-js';


let recaptchaVerifier: RecaptchaVerifier | null = null;

const getRecaptchaVerifier = (auth: Auth) => {
  if (!recaptchaVerifier) {
    recaptchaVerifier = new RecaptchaVerifier(
      auth,
      'recaptcha-container',
      {}
    );
  }
  return recaptchaVerifier;
};

const setUpRecaptcha = (phone: E164Number, auth: Auth): Promise<ConfirmationResult> => {
  const recaptchaVerifier = getRecaptchaVerifier(auth);
  recaptchaVerifier.render();
  console.log(`+${phone}`);
  console.log(recaptchaVerifier);
  return signInWithPhoneNumber(auth, `+${phone}`, recaptchaVerifier);
};

export default setUpRecaptcha;




// const setUpRecaptcha = (phone: E164Number, auth: Auth): Promise<ConfirmationResult> => {
//   const recaptchaVerifier = new RecaptchaVerifier(
//     auth,
//     'recaptcha-container',
//     {}
//   );

//   recaptchaVerifier.render();

//   return signInWithPhoneNumber(auth, `+${phone}`, recaptchaVerifier);
// };

// export default setUpRecaptcha