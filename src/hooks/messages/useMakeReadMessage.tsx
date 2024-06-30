import { useEffect } from 'react';

import type { DocumentData } from 'firebase/firestore';

import useChatStore from '@store/store';

import makeReadMessage from '@api/firestore/makeReadMessage';

type UseMakeReadMessage = (msg: DocumentData, isNearBottom: boolean) => void;

const useMakeReadMessage: UseMakeReadMessage = (msg, isNearBottom) => {
  const { chatUID } = useChatStore(state => state.currentChatInfo);
  const currentUserUID = useChatStore(state => state.currentUser.uid);

  useEffect(() => {
    if (
      msg.data().senderUserID !== currentUserUID &&
      !msg.data().isRead &&
      chatUID &&
      isNearBottom
    ) {
      makeReadMessage(chatUID, msg.id);
    }
  }, [chatUID, currentUserUID, isNearBottom, msg]);
};

export default useMakeReadMessage;
