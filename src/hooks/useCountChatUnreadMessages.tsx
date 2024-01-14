import { useEffect, useState } from 'react';

import { IUseCountChatUnreadMessages } from '@interfaces/hooks/IUseCountChatUnreadMessages';

const useCountChatUnreadMessages: IUseCountChatUnreadMessages =
  chatUnreadMessages => {
    const [countChatUnreadMessages, setCountChatUnreadMessages] =
      useState<number>(0);

    useEffect(() => {
      const countFromObjectChatUnreadMessages: number = Object.values(
        chatUnreadMessages
      ).reduce((acc, count) => (acc += count), 0);

      if (countFromObjectChatUnreadMessages === countChatUnreadMessages) {
        return;
      } else {
        setCountChatUnreadMessages(countFromObjectChatUnreadMessages);
      }
    }, [chatUnreadMessages, countChatUnreadMessages]);

    return countChatUnreadMessages;
  };

export default useCountChatUnreadMessages;
