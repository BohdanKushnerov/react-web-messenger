import { useEffect, useState } from 'react';

import { collection, onSnapshot, query, where } from 'firebase/firestore';

import { db } from '@myfirebase/config';

import useChatStore from '@zustand/store';

import { UseIsReadMyLastMessage } from 'types/hooks/UseIsReadMyLastMessage';

const useIsReadMyLastMessage: UseIsReadMyLastMessage = itemChatUID => {
  const [isReadMyLastMessage, setIsReadMyLastMessage] = useState(true);

  const { uid } = useChatStore(state => state.currentUser);

  useEffect(() => {
    if (!itemChatUID || !uid) return;

    const queryParams = query(
      collection(db, `chats/${itemChatUID}/messages`),
      where('isRead', '==', false),
      where('senderUserID', '==', uid)
    );

    const unSub = onSnapshot(queryParams, querySnapshot => {
      if (querySnapshot.docs.length > 0) {
        setIsReadMyLastMessage(false);
      } else {
        setIsReadMyLastMessage(true);
      }
    });

    return () => {
      unSub();
    };
  }, [itemChatUID, uid]);

  return isReadMyLastMessage;
};

export default useIsReadMyLastMessage;
