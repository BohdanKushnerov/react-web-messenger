import { useEffect } from 'react';
import { DocumentData } from 'firebase/firestore';

import useChatStore from '@zustand/store';
import makeReadMsg from '@api/firestore/makeReadMsg';

const useMakeReadMsg = (msg: DocumentData, isNearBottom: boolean) => {
  const { chatUID } = useChatStore(state => state.currentChatInfo);
  const currentUserUID = useChatStore(state => state.currentUser.uid);

  useEffect(() => {
    if (
      msg.data().senderUserID !== currentUserUID &&
      !msg.data().isRead &&
      chatUID &&
      isNearBottom
    ) {
      makeReadMsg(chatUID, msg.id);
    }
  }, [chatUID, currentUserUID, isNearBottom, msg]);
};

export default useMakeReadMsg;
