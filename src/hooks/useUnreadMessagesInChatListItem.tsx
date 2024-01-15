import { useEffect } from 'react';

import { IUseUnreadMessagesInChatListItem } from '@interfaces/hooks/IUseUnreadMessagesInChatListItem';
import useChatStore from '@zustand/store';

const useUnreadMessagesInChatListItem: IUseUnreadMessagesInChatListItem = (
  lengthOfMyUnreadMsgs,
  chatInfo
) => {
  const updateTotalUnreadMessages = useChatStore(
    state => state.updateTotalUnreadMessages
  );

  useEffect(() => {
    if (lengthOfMyUnreadMsgs) {
      updateTotalUnreadMessages({ [chatInfo[0]]: lengthOfMyUnreadMsgs });
    } 
  }, [chatInfo, lengthOfMyUnreadMsgs, updateTotalUnreadMessages]);
};

export default useUnreadMessagesInChatListItem;
