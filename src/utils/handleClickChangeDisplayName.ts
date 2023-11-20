import { auth, db } from '@myfirebase/config';
import { updateCurrentUser, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

const handleClickChangeDisplayName = async (
  newDisplayName: string,
  userUid: string
) => {
  if (auth.currentUser && userUid) {
    try {
      await updateProfile(auth.currentUser, {
        displayName: newDisplayName,
      })
        .then(() => {
          console.log('Profile updated!');
          updateCurrentUser(auth, auth.currentUser);
        })
        .catch(error => {
          // An error occurred
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
