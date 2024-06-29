import { useEffect } from 'react';

import useChatStore from '@store/store';

import type { UseResetMessagesStates } from 'types/hooks/UseResetMessagesStates';

const useResetMessagesStates: UseResetMessagesStates = (
  isReadyToFetchFirstNewChatMessages,
  lastLoadedMessage,
  isFinishMessages,
  setIsReadyFirstMessages,
  setGroupedMessages
) => {
  const { chatUID } = useChatStore(state => state.currentChatInfo);

  useEffect(() => {
    if (!chatUID) return;

    isReadyToFetchFirstNewChatMessages.current = true;
    lastLoadedMessage.current = null;
    isFinishMessages.current = false;

    setGroupedMessages(null);
    setIsReadyFirstMessages(false);
  }, [
    chatUID,
    isFinishMessages,
    isReadyToFetchFirstNewChatMessages,
    lastLoadedMessage,
    setGroupedMessages,
    setIsReadyFirstMessages,
  ]);
};

export default useResetMessagesStates;
