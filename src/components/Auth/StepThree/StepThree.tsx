import type { Dispatch, FC, SetStateAction } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import Button from '@components/common/Button/Button';
import LoaderUIActions from '@components/common/LoaderUIActions/LoaderUIActions';

import { auth, db } from '@myfirebase/config';

import useChatStore from '@store/store';

import { ElementsId } from '@enums/elementsId';

import authStep3 from '@assets/auth-step3.webp';

import { defaultNS } from '@i18n/i18n';

interface IStepThreeProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const StepThree: FC<IStepThreeProps> = ({ isLoading, setIsLoading }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const { t } = useTranslation(defaultNS, { keyPrefix: 'Auth' });

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
      console.error('handleUpdateProfile', error);
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
            autoFocus={true}
            className="h-10 w-full rounded-md border border-charcoal bg-transparent p-2"
            id={ElementsId.Name}
            type="text"
            value={name}
            onChange={handleChangeName}
          />
        </label>
        <label
          htmlFor={ElementsId.LastName}
          className="font-bold text-veryDarkGray"
        >
          {t('Surname')}
          <input
            className="h-10 w-full rounded-md border border-charcoal bg-transparent p-2"
            id={ElementsId.LastName}
            type="text"
            value={surname}
            onChange={handleChangeSurname}
          />
        </label>

        <Button
          variant="authConfirm"
          id={ElementsId.SignInButton}
          type="button"
          disabled={isLoading}
          onClick={handleUpdateProfile}
          ariaLabel="Auth confirm button"
        >
          {isLoading ? <LoaderUIActions /> : t('Continue')}
        </Button>
      </div>
    </>
  );
};

export default StepThree;
