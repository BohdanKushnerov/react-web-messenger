import { FC, useState } from 'react';
import { ConfirmationResult, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { E164Number } from 'libphonenumber-js';

import MyPhoneInput from '@components/Inputs/MyPhoneInput/MyPhoneInput';
import CodeInput from '@components/Inputs/CodeInput/CodeInput';
import { auth, db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import handleSubmitVerifyCode from './utils/handleSubmitVerifyCode';
import setUpRecaptcha from './utils/setUpRecaptcha';
import { AuthSteps } from 'types/AuthSteps';
import AuthConfirmButton from '@components/Buttons/AuthConfirmButton/AuthConfirmButton';
import { toast } from 'react-toastify';

const Auth: FC = () => {
  const [step, setStep] = useState<AuthSteps>('Step 1/3');
  const [phone, setPhone] = useState<E164Number | string>('16505553435');
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateCurrentUser = useChatStore(state => state.updateCurrentUser);

  const handleSubmitPhone = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (phone) {
      try {
        setIsLoading(true);
        const response = await setUpRecaptcha(phone, auth);
        setStep('Step 2/3');

        setConfirmationResult(response);
      } catch (error) {
        console.log('handleSubmitPhone error', error);
        toast.error(String(error));
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error('Номер телефона не определен');
    }
  };

  const handleMannageVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const userCredential = await handleSubmitVerifyCode(
        confirmationResult,
        code,
      );

      if (userCredential) {
        if (userCredential.user.displayName) {
          return;
        } else {
          setStep('Step 3/3');
        }
      }
    } catch (error) {
      console.log('handleMannageVerifyCode error', error);
      toast.error(String(error))
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const user = auth.currentUser;

      if (user) {
        await updateProfile(user, {
          displayName: `${name} ${surname}`,
        });

        // =================обновим юзеру имя в стейте============================
        await updateCurrentUser(user);

        // =================создаем юзера для поиска пользователей=======================
        await setDoc(doc(db, 'users', user.uid), {
          displayName: user.displayName,
          uid: user.uid,
          photoURL: null,
        });

        // =================создаем обьект чаты нашего юзера которого мы только создали=======================
        await setDoc(doc(db, 'userChats', user.uid), {});
      } 
    } catch (error) {
      console.log('handleUpdateProfile error', error);
      toast.error(String(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeSurname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(e.target.value);
  };

  return (
    <div className="bg-main-bcg bg-no-repeat bg-cover bg-center h-screen">
      <p className="text-white font-bold text-center">{step}</p>
      <div className="bg-mybcg min-w-240px max-w-320px h-150 mx-auto my-0 p-4 rounded-md">
        {step === 'Step 1/3' && (
          <>
            <img
              className="mx-auto mb-10 rounded-md"
              src="https://images.nightcafe.studio/jobs/b1mMho0tc6Zo10GkTLXe/b1mMho0tc6Zo10GkTLXe--1--h5wl0.jpg?tr=w-120,c-at_max"
              alt="phone"
              width={120}
              height={120}
            />
            <h1 className="font-bold text-white text-center">Registration</h1>
            <p className="text-textcolor text-center">
              Enter your phone number and we will send you a confirmation code
            </p>

            <form onSubmit={handleSubmitPhone} className="flex flex-col gap-1">
              <MyPhoneInput phone={phone} setPhone={setPhone} />
              <AuthConfirmButton isLoading={isLoading} />
            </form>
          </>
        )}
        {step === 'Step 2/3' && (
          <>
            <img
              className="mx-auto mb-10 rounded-md"
              src="https://images.nightcafe.studio/jobs/wSrsDx9XKJfVx8fOPc9F/wSrsDx9XKJfVx8fOPc9F--1--7ni36.jpg?tr=w-120,c-at_max"
              alt="phone"
              width={120}
              height={120}
            />
            <h1 className="font-bold text-white text-center">Verification</h1>
            <p className="text-textcolor text-center">
              Enter 6 digits from the message we sent you
            </p>

            <form
              onSubmit={handleMannageVerifyCode}
              className="flex flex-col gap-1"
            >
              <CodeInput setCode={setCode} />
              <AuthConfirmButton isLoading={isLoading} />
            </form>
          </>
        )}
        {step === 'Step 3/3' && (
          <>
            <img
              className="mx-auto mb-10 rounded-md"
              src="https://images.nightcafe.studio/jobs/bcazXMvJXZlem8MrBUaH/bcazXMvJXZlem8MrBUaH--1--c2com.jpg?tr=w-120,c-at_max"
              alt="phone"
              width={120}
              height={120}
            />
            <form
              onSubmit={handleUpdateProfile}
              className="flex flex-col gap-1"
            >
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
              <AuthConfirmButton isLoading={isLoading} />
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
