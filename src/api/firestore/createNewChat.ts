import { doc, setDoc } from 'firebase/firestore';

import { db } from '@myfirebase/config';

const createNewChat = async (chatID: string): Promise<void> => {
  await setDoc(doc(db, 'chats', chatID), {});
};

export default createNewChat;
