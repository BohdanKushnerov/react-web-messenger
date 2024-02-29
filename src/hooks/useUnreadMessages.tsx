import { useEffect } from 'react';

import { IUseUnreadMessages } from '@interfaces/hooks/IUseUnreadMessages';
import useChatStore from '@zustand/store';

const useUnreadMessages: IUseUnreadMessages = (
  lengthOfMyUnreadMsgs,
  chatInfo
) => {
  const updateTotalUnreadMessages = useChatStore(
    state => state.updateTotalUnreadMessages
  );

  useEffect(() => {
    if (chatInfo[0]) {
      if (lengthOfMyUnreadMsgs) {
        updateTotalUnreadMessages({ [chatInfo[0]]: lengthOfMyUnreadMsgs });
      } else {
        updateTotalUnreadMessages({ [chatInfo[0]]: 0 });
      }
    }
  }, [chatInfo, lengthOfMyUnreadMsgs, updateTotalUnreadMessages]);
};

export default useUnreadMessages;
