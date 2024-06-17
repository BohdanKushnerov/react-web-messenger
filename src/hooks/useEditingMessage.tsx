import { useEffect } from 'react';

import { UseEditingMessage } from 'types/hooks/UseEditingMessage';

const useEditingMessage: UseEditingMessage = (
  chatUID,
  inputRef,
  setMessage,
  editingMessageInfo,
  resetEditingMessage
) => {
  useEffect(() => {
    resetEditingMessage();
  }, [chatUID, resetEditingMessage]);

  useEffect(() => {
    if (editingMessageInfo) {
      if (document.activeElement !== inputRef.current) {
        inputRef.current?.focus();
      }

      const msg = editingMessageInfo.selectedMessage.data().message;
      setMessage(msg);
    }
  }, [editingMessageInfo, inputRef, setMessage]);
};

export default useEditingMessage;
