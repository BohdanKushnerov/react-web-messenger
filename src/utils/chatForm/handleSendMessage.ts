import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';

import { db } from '@myfirebase/config';
import { createAndSaveTextMsgDoc } from '@api/firestore/createAndSaveTextMsgDoc';

const updateUserChats = async (
  chatUID: string,
  message: string,
  currentUserUID: string,
  userUID: string
): Promise<void> => {
  await updateDoc(doc(db, 'userChats', currentUserUID), {
    [`${chatUID}.lastMessage`]: message,
    [`${chatUID}.senderUserID`]: currentUserUID,
    [`${chatUID}.date`]: serverTimestamp(),
  });

  await updateDoc(doc(db, 'userChats', userUID), {
    [`${chatUID}.lastMessage`]: message,
    [`${chatUID}.senderUserID`]: currentUserUID,
    [`${chatUID}.date`]: serverTimestamp(),
  });
};

const handleSendMessage = async (
  message: string,
  chatUID: string | null,
  currentUserUID: string | null,
  userUID: string | null
): Promise<void> => {
  if (!chatUID || !currentUserUID || !userUID) {
    console.log('Invalid parameters');
    return;
  }

  try {
    await createAndSaveTextMsgDoc(chatUID, message, currentUserUID);
    await updateUserChats(chatUID, message, currentUserUID, userUID);
  } catch (error) {
    console.log('error handleSendMessage', error);
  }
};

export default handleSendMessage;
