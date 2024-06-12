import { FC, useState } from 'react';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import AuthConfirmButton from '@components/Buttons/ButtonAuthConfirm/ButtonAuthConfirm';
import { auth, db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import { IStepThreeProps } from '@interfaces/IStepThreeProps';
import authStep3 from '@assets/auth-step3.webp';

const StepThree: FC<IStepThreeProps> = ({ isLoading, setIsLoading }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const { t } = useTranslation('translation', { keyPrefix: 'Auth' });

  const updateCurrentUser = useChatStore(state => state.updateCurrentUser);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const user = auth.currentUser;

      if (user) {
        await updateProfile(user, {
          displayName: `${name} ${surname}`,
        });

        await updateCurrentUser(user);

        await setDoc(doc(db, 'users', user.uid), {
          displayName: user.displayName,
          uid: user.uid,
          photoURL: null,
        });

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
    <>
      <img
        className="mx-auto mb-10 rounded-md"
        src={authStep3}
        alt="phone"
        width={120}
        height={120}
      />
      <form onSubmit={handleUpdateProfile} className="flex flex-col gap-1">
        <label htmlFor="name" className="font-bold text-textcolor">
          {t('Name')}
          <input
            className="w-full h-10 p-2 rounded-md bg-transparent border border-inputChar"
            id="name"
            type="text"
            value={name}
            onChange={handleChangeName}
          />
        </label>
        <label htmlFor="lastname" className="font-bold text-textcolor">
          {t('Surname')}
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
  );
};

export default StepThree;
