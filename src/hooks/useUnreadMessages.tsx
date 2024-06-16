import { useEffect } from 'react';

import useChatStore from '@zustand/store';

import { UseUnreadMessages } from 'types/hooks/UseUnreadMessages';

const useUnreadMessages: UseUnreadMessages = (
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
