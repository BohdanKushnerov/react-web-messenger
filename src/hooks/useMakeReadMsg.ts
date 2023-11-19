import { useEffect } from 'react';

import { makeReadMsg } from '@api/firestore/makeReadMsg';
import useChatStore from '@zustand/store';
import { DocumentData } from 'firebase/firestore';

const useMakeReadMsg = (msg: DocumentData) => {
  const { chatUID } = useChatStore(state => state.currentChatInfo);
  const currentUserUID = useChatStore(state => state.currentUser.uid);

  useEffect(() => {
    if (
      msg.data().senderUserID !== currentUserUID &&
      !msg.data().isRead &&
      chatUID
    ) {
      makeReadMsg(chatUID, msg.id);
    }
  }, [chatUID, currentUserUID, msg]);
};

export default useMakeReadMsg;
