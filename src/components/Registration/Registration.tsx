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
import VerificationInput from "react-verification-input";
import { E164Number } from 'libphonenumber-js';
// import CustomInput from './Input';

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

  const handleChangeCode = (code: string) => {
    setCode(code);
  }

  // npm i react-phone-input-2

  return (
    <div>
      <div className="bg-gray-400 w-96 h-150 mx-auto my-0 p-4 rounded-md">
        <img
          className="mx-auto mb-10"
          src="/src/assets/phone.jpg"
          alt="phone"
          width={100}
          height={100}
        />
        <h1 className="font-bold">Registration</h1>
        <p>Enter your phone number and we will send you a confirmation code</p>
        <form onSubmit={handleSubmitPhone} className="flex flex-col gap-1">
          <PhoneInput
            // className="border-gray-900 border-2 w-full rounded-md pl-2 outline-none"
            // className="bg-transparent w-full rounded-md p-2 outline-none text-white"
            placeholder="Enter phone number"
            international
            defaultCountry="UA"
            value={phone}
            onChange={setPhone}
          />
          <button
            className="w-full p-2 rounded-md bg-blue-600"
            // id="sign-in-button"
            type="submit"
          >
            Continue
          </button>
          <div className="mx-auto" id="recaptcha-container"></div>
        </form>
        <form onSubmit={setVerifyCode} className="flex flex-col gap-1">
          {/* <input
            className="border-gray-900	border-2 w-full rounded-md p-2 outline-none bg-transparent text-white"
            value={code}
            onChange={e => setCode(e.target.value)}
          />
          <button className="w-full p-2 rounded-md  bg-blue-600" type="submit">
            Continue
          </button> */}
          <VerificationInput
            classNames={{
              container: "flex justify-center bg-transparent",
              character: "bg-transparent border-t-0 border-x-0 border-b-4 outline-none text-white",
              // characterInactive: "border-red-900",
              characterSelected: "border-blue-300"
          }}
            length={6} 
            placeholder={" "} 
            value={code}
            onChange={handleChangeCode} />
          <button className="w-full p-2 rounded-md  bg-blue-600" type="submit">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
