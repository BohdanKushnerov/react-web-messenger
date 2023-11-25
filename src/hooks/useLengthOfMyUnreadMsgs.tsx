import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

import { db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import { ChatListItemType } from 'types/ChatListItemType';

const useLengthOfMyUnreadMsgs = (chatInfo: ChatListItemType) => {
  const [lengthOfMyUnreadMsgs, setLengthOfMyUnreadMsgs] = useState<number>(0);

  const { uid } = useChatStore(state => state.currentUser);

  useEffect(() => {
    const queryParams = query(
      collection(db, `chats/${chatInfo[0]}/messages`),
      where('isRead', '==', false),
      where('senderUserID', '!=', uid)
    );
    const unsubMyUnreadMsgs = onSnapshot(queryParams, querySnapshot => {
      if (querySnapshot.docs) {
        setLengthOfMyUnreadMsgs(querySnapshot.docs.length);
      }
    });
    return () => {
      unsubMyUnreadMsgs();
    };
  }, [chatInfo, uid]);

  return lengthOfMyUnreadMsgs;
};

export default useLengthOfMyUnreadMsgs;
