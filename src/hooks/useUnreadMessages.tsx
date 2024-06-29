import { useEffect } from 'react';

import useChatStore from '@store/store';

import type { UseUnreadMessages } from 'types/hooks/UseUnreadMessages';

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
