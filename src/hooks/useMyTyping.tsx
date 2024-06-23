import { useEffect, useRef } from 'react';

import useChatStore from '@zustand/store';

import updateTypingIsFalse from '@api/firestore/updateTypingIsFalse';
import updateTypingIsTrue from '@api/firestore/updateTypingIsTrue';

const useMyTyping = () => {
  const myTypingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const message = useChatStore(state => state.message);
  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const { chatUID, userUID } = useChatStore(state => state.currentChatInfo);

  useEffect(() => {
    if (chatUID && currentUserUID && message) {
      if (myTypingTimeoutRef.current === null) {
        updateTypingIsTrue(chatUID, currentUserUID);
      }

      const newTypingTimeout = setTimeout(() => {
        updateTypingIsFalse(chatUID, currentUserUID);
        myTypingTimeoutRef.current = null;
      }, 3000);

      if (myTypingTimeoutRef.current) {
        clearTimeout(myTypingTimeoutRef.current);
      }

      myTypingTimeoutRef.current = newTypingTimeout;
    }
  }, [chatUID, currentUserUID, message, myTypingTimeoutRef, userUID]);

  useEffect(() => {
    return () => {
      if (myTypingTimeoutRef.current) {
        clearTimeout(myTypingTimeoutRef.current);
        myTypingTimeoutRef.current = null;
      }
    };
  }, [chatUID, myTypingTimeoutRef]);
};

export default useMyTyping;
