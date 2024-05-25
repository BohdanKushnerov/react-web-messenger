import { User, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

import { db } from '@myfirebase/config';

const updateUserProfile = async (
  user: User,
  photoURL: string,
  currentUserUID: string,
  updateCurrentUser: (user: User | null) => void
): Promise<void> => {
  await updateProfile(user, { photoURL });

  await updateDoc(doc(db, 'users', currentUserUID), {
    photoURL,
  });

  updateCurrentUser(user);
};

export default updateUserProfile;
