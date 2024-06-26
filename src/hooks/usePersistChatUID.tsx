import { useEffect } from 'react';

import useChatStore from '@store/store';

const usePersistChatUID = () => {
  const { chatUID } = useChatStore(state => state.currentChatInfo);

  useEffect(() => {
    if (chatUID) {
      localStorage.setItem('currentChatId', chatUID);
    }

    return () => {
      localStorage.removeItem('currentChatId');
    };
  }, [chatUID]);
};

export default usePersistChatUID;
