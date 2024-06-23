import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import AuthConfirmButton from '@components/Buttons/ButtonAuthConfirm/ButtonAuthConfirm';

import { auth, db } from '@myfirebase/config';

import useChatStore from '@zustand/store';

import { IStepThreeProps } from '@interfaces/IStepThreeProps';

import { ElementsId } from '@enums/elementsId';

import authStep3 from '@assets/auth-step3.webp';

const StepThree: FC<IStepThreeProps> = ({ isLoading, setIsLoading }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const { t } = useTranslation('translation', { keyPrefix: 'Auth' });

  const updateCurrentUser = useChatStore(state => state.updateCurrentUser);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name === '' || surname === '') {
      toast.error(t('EmptyNameSurname'));
      return;
    }

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
      toast.error(t('UpdateProfileError'));
      console.log('handleUpdateProfile error', error);
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
      <div className="flex flex-col gap-1">
        <label
          htmlFor={ElementsId.Name}
          className="font-bold text-veryDarkGray"
        >
          {t('Name')}
          <input
            autoFocus
            className="h-10 w-full rounded-md border border-charcoal bg-transparent p-2"
            id={ElementsId.Name}
            type="text"
            value={name}
            onChange={handleChangeName}
          />
        </label>
        <label
          htmlFor={ElementsId.Lastname}
          className="font-bold text-veryDarkGray"
        >
          {t('Surname')}
          <input
            className="h-10 w-full rounded-md border border-charcoal bg-transparent p-2"
            id={ElementsId.Lastname}
            type="text"
            value={surname}
            onChange={handleChangeSurname}
          />
        </label>
        <AuthConfirmButton
          isLoading={isLoading}
          onSubmit={handleUpdateProfile}
        />
      </div>
    </>
  );
};

export default StepThree;
