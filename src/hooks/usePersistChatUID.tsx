import useChatStore from '@zustand/store';
import { useEffect } from 'react';


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
