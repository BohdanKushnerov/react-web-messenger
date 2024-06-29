import { useEffect } from 'react';

import useChatStore from '@store/store';

import makeReadMessage from '@api/firestore/makeReadMessage';

import type { UseMakeReadMessage } from 'types/hooks/UseMakeReadMessage';

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
