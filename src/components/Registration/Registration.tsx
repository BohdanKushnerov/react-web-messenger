import { useState } from 'react';
import {
  ConfirmationResult,
  // updateProfile,
} from 'firebase/auth';
import { auth } from '../../firebase/config';
import { E164Number } from 'libphonenumber-js';
import MyPhoneInput from './MyPhoneInput';
import CodeInput from './CodeInput';
import handleSubmitVerifyCode from './utils/handleSubmitVerifyCodeVerifyCode';
import setUpRecaptcha from './utils/setUpRecaptcha';

export default function Registration() {
  const [step, setStep] = useState('Step 1/3')
  const [phone, setPhone] = useState<E164Number | string>('');
  const [code, setCode] = useState('');
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);

    console.log(phone)


  const handleSubmitPhone = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    // console.log(phone)

    if (phone) {
      try {
        const response = await setUpRecaptcha(phone, auth);
        setStep('Step 2/3')
        console.log(step)

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
      <p className='text-white font-bold text-center'>{step}</p>
      <div className="bg-mybcg w-96 h-150 mx-auto my-0 p-4 rounded-md">
        <img
          className="mx-auto mb-10 rounded-md"
          src="/src/assets/phone.jpg"
          alt="phone"
          width={120}
          height={120}
        />
        <h1 className="font-bold text-white text-center">Registration</h1>
        <p className="text-textcolor text-center">
          Enter your phone number and we will send you a confirmation code
        </p>
        {step === 'Step 1/3' && <form onSubmit={handleSubmitPhone} className="flex flex-col gap-1">
          <MyPhoneInput phone={phone} setPhone={setPhone} />
          <button
            className="w-full p-2 rounded-md bg-myblue text-white font-bold"
            // id="sign-in-button"
            type="submit"
          >
            Continue
          </button>
          <div className="mx-auto" id="recaptcha-container"></div>
        </form>}
        {step === 'Step 2/3' && <form onSubmit={(e)=>handleSubmitVerifyCode(e, confirmationResult, code)} className="flex flex-col gap-1">
          <CodeInput setCode={setCode} />
          <button
            className="w-full p-2 rounded-md bg-myblue text-white font-bold"
            type="submit"
          >
            Continue
          </button>
        </form>}
      </div>
    </div>
  );
}
