import { User, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { TFunction } from 'i18next';
import { toast } from 'react-toastify';

import { auth, db } from '@myfirebase/config';

const handleClickChangeDisplayName = async (
  newDisplayName: string,
  userUid: string,
  updateCurrentUser: (user: User) => void,
  t: TFunction<'translation', 'ProfileSettings'>
) => {
  if (auth.currentUser && userUid) {
    try {
      await updateProfile(auth.currentUser, {
        displayName: newDisplayName,
      })
        .then(() => {
          if (auth.currentUser) {
            updateCurrentUser(auth.currentUser);
          }
        })
        .then(() => toast.success(t('ChangeNameToast')))
        .catch(error => {
          console.log('handleClickChangeDisplayName error', error);
        });

      // обновить имя в сторе
      await updateDoc(doc(db, 'users', userUid), {
        displayName: newDisplayName,
      });
    } catch (error) {
      console.log('handleClickChangeDisplayName error', error);
    }
  }
};

export default handleClickChangeDisplayName;
