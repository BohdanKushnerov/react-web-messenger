import { doc, updateDoc } from 'firebase/firestore';

import { db } from '@myfirebase/config';

const updateUserChatLastMessage = async (
  chatUID: string,
  userUID: string,
  lastMessage: string,
  senderUserID: string,
  date: string
): Promise<void> => {
  await updateDoc(doc(db, 'userChats', userUID), {
    [`${chatUID}.lastMessage`]: lastMessage,
    [`${chatUID}.senderUserID`]: senderUserID,
    [`${chatUID}.date`]: date,
  });
};

export default updateUserChatLastMessage;
