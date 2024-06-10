import { useEffect } from 'react';

import { UseEditingMessage } from 'types/hooks/UseEditingMessage';

const useEditingMessage: UseEditingMessage = (
  editingMessageInfo,
  setMessage
) => {
  useEffect(() => {
    if (editingMessageInfo) {
      const msg = editingMessageInfo.selectedMessage.data().message;
      setMessage(msg);
    }
  }, [editingMessageInfo, setMessage]);
};

export default useEditingMessage;
