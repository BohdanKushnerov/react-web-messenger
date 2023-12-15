import { auth, db } from '@myfirebase/config';
import { User, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

const handleClickChangeDisplayName = async (
  newDisplayName: string,
  userUid: string,
  updateCurrentUser: (user: User) => void
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
