import { useEffect } from 'react';

import useChatStore from '@store/store';

type UseUnreadMessages = (
  lengthOfMyUnreadMessages: number,
  chatUID: string
) => void;

const useUnreadMessages: UseUnreadMessages = (
  lengthOfMyUnreadMessages,
  chatUID
) => {
  const updateTotalUnreadMessages = useChatStore(
    state => state.updateTotalUnreadMessages
  );

  useEffect(() => {
    if (chatUID) {
      if (lengthOfMyUnreadMessages) {
        updateTotalUnreadMessages({ [chatUID]: lengthOfMyUnreadMessages });
      } else {
        updateTotalUnreadMessages({ [chatUID]: 0 });
      }
    }
  }, [chatUID, lengthOfMyUnreadMessages, updateTotalUnreadMessages]);
};

export default useUnreadMessages;
