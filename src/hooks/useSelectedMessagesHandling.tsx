import { useEffect } from 'react';

import useChatStore from '@zustand/store';

const useSelectedMessagesHandling = () => {
  const { chatUID } = useChatStore(state => state.currentChatInfo);
  const isSelectedMessages = useChatStore(state => state.isSelectedMessages);
  const selectedDocDataMessage = useChatStore(
    state => state.selectedDocDataMessage
  );
  const updateSelectedDocDataMessage = useChatStore(
    state => state.updateSelectedDocDataMessage
  );
  const resetSelectedMessages = useChatStore(
    state => state.resetSelectedMessages
  );
  const updateIsSelectedMessages = useChatStore(
    state => state.updateIsSelectedMessages
  );

  useEffect(() => {
    if (!isSelectedMessages) {
      updateSelectedDocDataMessage(null);
    }
  }, [isSelectedMessages, updateSelectedDocDataMessage]);

  useEffect(() => {
    if (selectedDocDataMessage === null) {
      updateIsSelectedMessages(false);
    }
  }, [selectedDocDataMessage, updateIsSelectedMessages]);

  useEffect(() => {
    resetSelectedMessages();
  }, [chatUID, resetSelectedMessages]);
};

export default useSelectedMessagesHandling;
