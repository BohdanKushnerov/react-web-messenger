import { useState } from 'react';
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  // updateProfile,
} from 'firebase/auth';
import { auth } from '../../firebase/config';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { E164Number } from 'libphonenumber-js';

export default function Step1() {
  const [phone, setPhone] = useState<E164Number | undefined>(undefined);
  const [code, setCode] = useState('');
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);

  const setUpRecaptcha = (phone: E164Number): Promise<ConfirmationResult> => {
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      'recaptcha-container',
      {}
    );

    recaptchaVerifier.render();

    return signInWithPhoneNumber(auth, phone, recaptchaVerifier);
  };

  const setVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (confirmationResult) {
      try {
        console.log('confirmationResult', confirmationResult);
        console.log('code', code);
        const userCredential = await confirmationResult.confirm(code);
        console.log(userCredential);
      } catch (error) {
        console.log('setVerifyCode error', error);
      }
    }
  };

  const handleSubmitPhone = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (phone) {
      try {
        const response = await setUpRecaptcha(phone);
        setConfirmationResult(response);
      } catch (error) {
        console.log('handleSubmitPhone error', error);
      }
    } else {
      console.error('Номер телефона не определен');
    }
  };

  return (
    <div>
      <div className="bg-white w-96 h-96 mx-auto my-0 p-4">
        <img
          className="mx-auto mb-10"
          src="/src/assets/phone.jpg"
          alt="phone"
          width={100}
          height={100}
        />
        <h1 className="font-bold font">Registration</h1>
        <p>Enter your phone number and we will send you a confirmation code</p>
        <form onSubmit={handleSubmitPhone}>
          {/* <input
            className="border-black border-2 w-full"
            value={phone}
            onChange={handleChangePhone}
          /> */}
          <PhoneInput
            className="border-black border-2 w-full"
            placeholder="Enter phone number"
            international
            defaultCountry="UA"
            value={phone}
            onChange={setPhone}
          />
          <button
            className="rounded-full bg-slate-500"
            // id="sign-in-button"
            type="submit"
          >
            Continue
          </button>
          <div id="recaptcha-container"></div>
        </form>
        <form onSubmit={setVerifyCode}>
          <input
            className="border-black border-2 w-full"
            value={code}
            onChange={e => setCode(e.target.value)}
          />
          <button
            className="rounded-full bg-slate-500"
            // id="sign-in-button"
            type="submit"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
