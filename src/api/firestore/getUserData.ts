import { doc, getDoc } from 'firebase/firestore';
import type { DocumentData, DocumentSnapshot } from 'firebase/firestore';

import { db } from '@myfirebase/config';

const getUserData = async (
  userUID: string
): Promise<DocumentSnapshot<DocumentData> | undefined> => {
  const docRef = doc(db, 'users', userUID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap;
  }

  return undefined;
};

export default getUserData;
