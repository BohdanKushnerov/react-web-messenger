import { useEffect } from 'react';

const usePersistchatUID = (chatUID: string | null) => {
  useEffect(() => {
    if (chatUID) {
      localStorage.setItem('currentChatId', chatUID);
    }

    return () => {
      localStorage.removeItem('currentChatId');
    };
  }, [chatUID]);
};

export default usePersistchatUID;
