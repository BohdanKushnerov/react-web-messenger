import { useEffect } from 'react';

import { UseSelectedMessagesHandling } from 'types/hooks/UseSelectedMessagesHandling';

const useSelectedMessagesHandling: UseSelectedMessagesHandling = (
  chatUID,
  isSelectedMessages,
  selectedDocDataMessage,
  updateIsSelectedMessages,
  updateSelectedDocDataMessage,
  resetSelectedMessages
) => {
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
