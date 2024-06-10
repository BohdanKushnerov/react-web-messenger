import { useEffect } from 'react';
import { UsePersistChatUID } from 'types/hooks/UsePersistChatUID';

const usePersistChatUID: UsePersistChatUID = chatUID => {
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
