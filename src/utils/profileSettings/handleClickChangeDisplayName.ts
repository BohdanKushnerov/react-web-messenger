import { toast } from 'react-toastify';

import type { User } from 'firebase/auth';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import type { TFunction } from 'i18next';

import { auth, db } from '@myfirebase/config';

const handleClickChangeDisplayName = async (
  newDisplayName: string,
  userUid: string,
  updateCurrentUser: (user: User) => void,
  t: TFunction<'ProfileSettings'>
) => {
  if (auth.currentUser && userUid) {
    try {
      if (newDisplayName.trim() === '') {
        throw new Error('Empty name');
      }
      await updateProfile(auth.currentUser, {
        displayName: newDisplayName,
      });

      if (auth.currentUser) {
        updateCurrentUser(auth.currentUser);
      }

      await updateDoc(doc(db, 'users', userUid), {
        displayName: newDisplayName,
      });

      toast.success(t('ChangeNameToastSuccess'));
    } catch (error) {
      toast.error(t('ChangeNameToastError'));
      console.error('handleClickChangeDisplayName', error);
    }
  }
};

export default handleClickChangeDisplayName;
