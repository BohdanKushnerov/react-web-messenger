import { useEffect, useState } from 'react';

import { UseCountChatUnreadMessages } from 'types/hooks/UseCountChatUnreadMessages';

const useCountChatUnreadMessages: UseCountChatUnreadMessages =
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

    return countChatUnreadMessages !== 0 ? countChatUnreadMessages : null;
  };

export default useCountChatUnreadMessages;
