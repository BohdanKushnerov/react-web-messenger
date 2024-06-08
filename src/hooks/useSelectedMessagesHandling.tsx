import { DocumentData } from 'firebase/firestore';
import { useEffect } from 'react';

const useSelectedMessagesHandling = (
  chatUID: string | null,
  isSelectedMessages: boolean,
  selectedDocDataMessage: DocumentData[] | null,
  updateIsSelectedMessages: (boolean: boolean) => void,
  updateSelectedDocDataMessage: (
    msg:
      | DocumentData[]
      | ((prevState: DocumentData[] | null) => DocumentData[] | null)
      | null
  ) => void,
  resetSelectedMessages: () => void
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
