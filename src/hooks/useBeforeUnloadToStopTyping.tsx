import { useEffect } from 'react';

import useChatStore from '@zustand/store';
import { updateTypingIsFalse } from '@api/firestore/updateTypingIsFalse';

const useBeforeUnloadToStopTyping = () => {
  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const { chatUID } = useChatStore(state => state.currentChatInfo);
  // еффект beforeunload чтобы прекратить состояние печати
  useEffect(() => {
    if (!chatUID || !currentUserUID) return;
    const handleWindowBeforeUnload = async (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';

      await updateTypingIsFalse(chatUID, currentUserUID);
    };

    window.addEventListener('beforeunload', handleWindowBeforeUnload);

    return () => {
      const handleWindowUnmountBeforeUnload = async () => {
        await updateTypingIsFalse(chatUID, currentUserUID);
        window.removeEventListener('beforeunload', handleWindowBeforeUnload);
      };

      handleWindowUnmountBeforeUnload();
    };
  }, [chatUID, currentUserUID]);
}

export default useBeforeUnloadToStopTyping;
