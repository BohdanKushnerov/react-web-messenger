import { useEffect } from 'react';

import { IUseEditingMessage } from '@interfaces/hooks/IUseEditingMessage';

const useEditingMessage: IUseEditingMessage = (
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
