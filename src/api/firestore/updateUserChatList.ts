import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';

import { db } from '@myfirebase/config';

const updateUserChatList = async (
  userUID: string,
  chatID: string,
  otherUserUID: string
): Promise<void> => {
  await updateDoc(doc(db, 'userChats', userUID), {
    [`${chatID}.userUID`]: otherUserUID,
    [`${chatID}.date`]: serverTimestamp(),
  });
};

export default updateUserChatList;
