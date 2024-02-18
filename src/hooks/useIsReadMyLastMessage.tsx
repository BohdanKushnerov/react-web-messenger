import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

import { db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import { ChatListItemType } from '@myTypes';

const useIsReadMyLastMessage = (chatInfo: ChatListItemType) => {
  const [isReadMyLastMessage, setIsReadMyLastMessage] = useState(true);

  const { uid } = useChatStore(state => state.currentUser);

  // прочитаное мое последнее сообщение или нет
  useEffect(() => {
    if (!chatInfo[0] || !uid) return;

    const queryParams = query(
      collection(db, `chats/${chatInfo[0]}/messages`),
      where('isRead', '==', false),
      where('senderUserID', '==', uid)
    );

    const unSub = onSnapshot(queryParams, querySnapshot => {
      if (querySnapshot.docs.length > 0) {
        // setLengthOfUnReadMsgs(querySnapshot.docs.length);
        setIsReadMyLastMessage(false);
      } else {
        setIsReadMyLastMessage(true);
      }
    });

    return () => {
      unSub();
    };
  }, [chatInfo, uid]);

  return isReadMyLastMessage;
};

export default useIsReadMyLastMessage;
