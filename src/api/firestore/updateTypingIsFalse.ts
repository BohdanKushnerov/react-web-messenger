import { doc, updateDoc } from "firebase/firestore";

import { db } from "@myfirebase/config";

export const updateTypingIsFalse = async (chatUID: string, currentUserUID: string) => {
const chatDocRef = doc(db, 'chats', chatUID);

  const updateTypingTrue = {
    [currentUserUID]: {
      isTyping: false,
    },
  };

  await updateDoc(chatDocRef, updateTypingTrue);
};
