import { doc, updateDoc } from 'firebase/firestore';

import { db } from '@myfirebase/config';

const updateEditedMessageTextContent = async (
  chatUID: string,
  messageId: string,
  newMessage: string
): Promise<void> => {
  const messageDocRef = doc(db, 'chats', chatUID, 'messages', messageId);
  await updateDoc(messageDocRef, {
    message: newMessage,
  });
};

export default updateEditedMessageTextContent;
