import { useEffect } from 'react';

import useChatStore from '@zustand/store';

import { UseResetMsgsStates } from 'types/hooks/UseResetMsgsStates';

const useResetMsgsStates: UseResetMsgsStates = (
  isReadyToFetchFirstNewChatMsgs,
  lastLoadedMsg,
  isFinishMsgs,
  setIsReadyFirstMsgs,
  setGroupedMessages
) => {
  const { chatUID } = useChatStore(state => state.currentChatInfo);

  useEffect(() => {
    isReadyToFetchFirstNewChatMsgs.current = true;
    lastLoadedMsg.current = null;
    isFinishMsgs.current = false;

    setGroupedMessages(null);
    setIsReadyFirstMsgs(false);
  }, [
    chatUID,
    isFinishMsgs,
    isReadyToFetchFirstNewChatMsgs,
    lastLoadedMsg,
    setGroupedMessages,
    setIsReadyFirstMsgs,
  ]);
};

export default useResetMsgsStates;
