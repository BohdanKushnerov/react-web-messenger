import { useEffect } from 'react';

import { UseResetMsgsStates } from 'types/hooks/UseResetMsgsStates';

const useResetMsgsStates: UseResetMsgsStates = (
  chatUID,
  isReadyToFetchFirstNewChatMsgs,
  lastLoadedMsg,
  isFinishMsgs,
  setIsReadyFirstMsgs,
  setGroupedMessages
) => {
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
