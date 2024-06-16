import { useEffect, useState } from 'react';

import { doc, onSnapshot } from 'firebase/firestore';

import { db } from '@myfirebase/config';

import useChatStore from '@zustand/store';

const useShowTyping = () => {
  const [isOpponentTyping, setIsOpponentTyping] = useState(false);

  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const { chatUID, userUID } = useChatStore(state => state.currentChatInfo);

  useEffect(() => {
    if (!chatUID || !userUID) {
      return;
    }

    const chatDocRef = doc(db, 'chats', chatUID);

    const unsubOponentTypingStatus = onSnapshot(
      chatDocRef,
      docSnapshot => {
        if (docSnapshot.exists()) {
          const chatData = docSnapshot.data();

          if (
            chatData[userUID]?.isTyping === false ||
            chatData[userUID]?.isTyping === true
          ) {
            setIsOpponentTyping(chatData[userUID].isTyping);
          }
        }
      },
      error => {
        console.error('error listener of isTyping:', error);
      }
    );

    return () => {
      unsubOponentTypingStatus();
    };
  }, [chatUID, currentUserUID, userUID]);

  return isOpponentTyping;
};

export default useShowTyping;
