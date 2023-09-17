import { useState } from 'react';
import { ConfirmationResult, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { E164Number } from 'libphonenumber-js';

import MyPhoneInput from './MyPhoneInput';
import CodeInput from './CodeInput';
import { auth, db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import handleSubmitVerifyCode from './utils/handleSubmitVerifyCodeVerifyCode';
import setUpRecaptcha from './utils/setUpRecaptcha';
import { TRegistrationSteps } from 'types/TRegistrationSteps';

export default function Registration() {
  const [step, setStep] = useState<TRegistrationSteps>('Step 1/3');
  const [phone, setPhone] = useState<E164Number | string>('380 63 677 1111');
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);

  const updateCurrentUser = useChatStore(state => state.updateCurrentUser);

  const handleSubmitPhone = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (phone) {
      try {
        const response = await setUpRecaptcha(phone, auth);
        console.log('response setUpRecaptcha', response);
        setStep('Step 2/3');
        console.log(step);

        setConfirmationResult(response);
      } catch (error) {
        console.log('handleSubmitPhone error', error);
      }
    } else {
      console.error('Номер телефона не определен');
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = auth.currentUser;

    if (user) {
      await updateProfile(user, {
        displayName: `${name} ${surname}`,
        // photoURL: "https://example.com/jane-q-user/profile.jpg"
      });

      console.log('user handleUpdateProfile', user);
      // =================обновим юзеру имя в стейте============================
      await updateCurrentUser(user);
      // =================создаем юзера для поиска пользователей=======================

      await setDoc(doc(db, 'users', user.uid), {
        displayName: user.displayName,
        uid: user.uid,
        photoURL:
          'https://cdn.iconscout.com/icon/free/png-256/free-profile-1439375-1214445.png?f=avif&w=128',
      });

      // =================создаем обьект чаты нашего юзера которого мы только создали=======================
      await setDoc(doc(db, 'userChats', user.uid), {});
    } else {
      console.error('Пользователь не вошел в систему');
    }
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeSurname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(e.target.value);
  };

  return (
    <div>
      <p className="text-white font-bold text-center">{step}</p>
      <div className="bg-mybcg min-w-240px max-w-320px h-150 mx-auto my-0 p-4 rounded-md">
        <img
          className="mx-auto mb-10 rounded-md"
          src="/src/assets/phone.jpg"
          alt="phone"
          width={120}
          height={120}
        />
        {step === 'Step 1/3' && (
          <>
            <h1 className="font-bold text-white text-center">Registration</h1>
            <p className="text-textcolor text-center">
              Enter your phone number and we will send you a confirmation code
            </p>

            <form onSubmit={handleSubmitPhone} className="flex flex-col gap-1">
              <MyPhoneInput phone={phone} setPhone={setPhone} />
              <button
                className="w-full p-2 rounded-md bg-myblue text-white font-bold"
                id="sign-in-button"
                type="submit"
              >
                Continue
              </button>
            </form>
          </>
        )}
        {step === 'Step 2/3' && (
          <>
            <h1 className="font-bold text-white text-center">Verification</h1>
            <p className="text-textcolor text-center">
              Enter 6 digits from the message we sent you
            </p>

            <form
              onSubmit={e =>
                handleSubmitVerifyCode(e, confirmationResult, code, setStep)
              }
              className="flex flex-col gap-1"
            >
              <CodeInput setCode={setCode} />
              <button
                className="w-full p-2 rounded-md bg-myblue text-white font-bold"
                type="submit"
              >
                Continue
              </button>
            </form>
          </>
        )}
        {step === 'Step 3/3' && (
          <form onSubmit={handleUpdateProfile} className="flex flex-col gap-1">
            <label htmlFor="name" className="font-bold text-textcolor">
              Name
              <input
                className="w-full h-10 p-2 rounded-md bg-transparent border border-inputChar"
                id="name"
                type="text"
                value={name}
                onChange={handleChangeName}
              />
            </label>
            <label htmlFor="lastname" className="font-bold text-textcolor">
              Surname
              <input
                className="w-full h-10 p-2 rounded-md bg-transparent border border-inputChar"
                id="lastname"
                type="text"
                value={surname}
                onChange={handleChangeSurname}
              />
            </label>
            <button
              className="w-full p-2 rounded-md bg-myblue text-white font-bold"
              type="submit"
            >
              Continue
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
