import { type DocumentData, doc, getDoc } from 'firebase/firestore';

import { db } from '@myfirebase/config';

const getChatData = async (
  userUID: string,
  chatID: string
): Promise<DocumentData> => {
  const res = await getDoc(doc(db, 'userChats', userUID));
  return res.data()?.[chatID];
};

export default getChatData;
