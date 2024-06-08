import { useEffect } from 'react';

import useChatStore from '@zustand/store';
import { IUseUnreadMessages } from '@interfaces/hooks/IUseUnreadMessages';

const useUnreadMessages: IUseUnreadMessages = (
  lengthOfMyUnreadMsgs,
  chatUID
) => {
  const updateTotalUnreadMessages = useChatStore(
    state => state.updateTotalUnreadMessages
  );

  useEffect(() => {
    if (chatUID) {
      if (lengthOfMyUnreadMsgs) {
        updateTotalUnreadMessages({ [chatUID]: lengthOfMyUnreadMsgs });
      } else {
        updateTotalUnreadMessages({ [chatUID]: 0 });
      }
    }
  }, [chatUID, lengthOfMyUnreadMsgs, updateTotalUnreadMessages]);
};

export default useUnreadMessages;
