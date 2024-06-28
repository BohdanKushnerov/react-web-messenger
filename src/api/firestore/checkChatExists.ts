import { doc, getDoc } from 'firebase/firestore';

import { db } from '@myfirebase/config';

const checkChatExists = async (chatID: string): Promise<boolean> => {
  const res = await getDoc(doc(db, 'chats', chatID));
  return res.exists();
};

export default checkChatExists;
