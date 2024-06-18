import { useEffect } from 'react';

import useChatStore from '@zustand/store';

import { UseEditingMessage } from 'types/hooks/UseEditingMessage';

const useEditingMessage: UseEditingMessage = inputRef => {
  const setMessage = useChatStore(state => state.setMessage);
  const { chatUID } = useChatStore(state => state.currentChatInfo);
  const editingMessageInfo = useChatStore(state => state.editingMessageInfo);
  const resetEditingMessage = useChatStore(state => state.resetEditingMessage);

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
