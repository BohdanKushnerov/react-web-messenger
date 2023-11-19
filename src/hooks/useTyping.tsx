import { useEffect } from 'react';

import useChatStore from '@zustand/store';
import { updateTypingIsFalse } from '@api/firestore/updateTypingIsFalse';
import { updateTypingIsTrue } from '@api/firestore/updateTypingIsTrue';
import { IuseTyping } from '@interfaces/IuseTyping';

const useTyping: IuseTyping = (message, myTypingTimeoutRef) => {
  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const { chatUID, userUID } = useChatStore(state => state.currentChatInfo);

  // запуск таймаута при печатании
  useEffect(() => {
    if (chatUID && currentUserUID && message) {
      console.log('in useEffect timeout');
      console.log('message', message);
      updateTypingIsTrue(chatUID, currentUserUID);

      const newTypingTimeout = setTimeout(() => {
        console.log('new');
        updateTypingIsFalse(chatUID, currentUserUID);
        myTypingTimeoutRef.current = null;
      }, 3000);

      if (myTypingTimeoutRef.current) {
        console.log('clear', myTypingTimeoutRef.current);
        clearTimeout(myTypingTimeoutRef.current);
      }

      myTypingTimeoutRef.current = newTypingTimeout;
    }
    // }, [chatUID, currentUserUID, message, userUID]);
  }, [chatUID, currentUserUID, message, myTypingTimeoutRef, userUID]);

  // очистка таймаута при смене чата
  useEffect(() => {
    return () => {
      if (myTypingTimeoutRef.current) {
        console.log('cleanup', myTypingTimeoutRef.current);
        clearTimeout(myTypingTimeoutRef.current);
        myTypingTimeoutRef.current = null;
      }
    };
  }, [chatUID, myTypingTimeoutRef]);
};

export default useTyping;
