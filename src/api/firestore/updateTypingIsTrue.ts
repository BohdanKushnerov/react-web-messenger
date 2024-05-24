import { doc, updateDoc } from 'firebase/firestore';

import { db } from '@myfirebase/config';

const updateTypingIsTrue = async (chatUID: string, currentUserUID: string) => {
  const chatDocRef = doc(db, 'chats', chatUID);

  const updateTypingTrue = {
    [currentUserUID]: {
      isTyping: true,
    },
  };

  await updateDoc(chatDocRef, updateTypingTrue);
};

export default updateTypingIsTrue;
