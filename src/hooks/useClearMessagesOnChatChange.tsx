import { useEffect } from 'react';

import { IUseClearMessagesOnChatChange } from '@interfaces/hooks/IUseClearMessagesOnChatChange';

const useClearMessagesOnChatChange: IUseClearMessagesOnChatChange = (
  chatUID,
  setMessage
) => {
  useEffect(() => {
    if (chatUID) {
      setMessage('');
    }
  }, [chatUID, setMessage]);
};

export default useClearMessagesOnChatChange;
