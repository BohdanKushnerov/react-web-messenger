import { doc, updateDoc } from 'firebase/firestore';

import { db } from '@myfirebase/config';

const updateEditedUserChatLastMessage = async (
  chatUID: string,
  userUID: string,
  lastMessage: string
): Promise<void> => {
  await updateDoc(doc(db, 'userChats', userUID), {
    [`${chatUID}.lastMessage`]: lastMessage,
  });
};

export default updateEditedUserChatLastMessage;
