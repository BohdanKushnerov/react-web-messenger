import { useEffect } from 'react';

import { IUseUnreadMessagesInChatListItem } from '@interfaces/hooks/IUseUnreadMessagesInChatListItem';

const useUnreadMessagesInChatListItem: IUseUnreadMessagesInChatListItem = (
  lengthOfMyUnreadMsgs,
  setChatUnreadMessages,
  chatInfo
) => {
  useEffect(() => {
    if (lengthOfMyUnreadMsgs) {
      setChatUnreadMessages(prev => {
        return {
          ...prev,
          [chatInfo[0]]: lengthOfMyUnreadMsgs,
        };
      });
    } else {
      setChatUnreadMessages(prev => {
        return {
          ...prev,
          [chatInfo[0]]: 0,
        };
      });
    }
  }, [chatInfo, setChatUnreadMessages, lengthOfMyUnreadMsgs]);
};

export default useUnreadMessagesInChatListItem;
