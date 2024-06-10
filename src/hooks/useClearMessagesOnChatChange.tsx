import { useEffect } from 'react';

import { UseClearMessagesOnChatChange } from 'types/hooks/UseClearMessagesOnChatChange';

const useClearMessagesOnChatChange: UseClearMessagesOnChatChange = (
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
