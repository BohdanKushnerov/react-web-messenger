import { useEffect } from 'react';

import useChatStore from '@state/store';

const useClearMessagesOnChatChange = () => {
  const { chatUID } = useChatStore(state => state.currentChatInfo);
  const setMessage = useChatStore(state => state.setMessage);

  useEffect(() => {
    if (chatUID) {
      setMessage('');
    }
  }, [chatUID, setMessage]);
};

export default useClearMessagesOnChatChange;
