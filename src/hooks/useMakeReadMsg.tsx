import { useEffect } from 'react';

import useChatStore from '@zustand/store';

import makeReadMsg from '@api/firestore/makeReadMsg';

import { UseMakeReadMsg } from 'types/hooks/UseMakeReadMsg';

const useMakeReadMsg: UseMakeReadMsg = (msg, isNearBottom) => {
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
