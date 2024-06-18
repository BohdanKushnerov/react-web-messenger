import { useEffect, useState } from 'react';

import useChatStore from '@zustand/store';

const useCountChatUnreadMessages = () => {
  const [countChatUnreadMessages, setCountChatUnreadMessages] =
    useState<number>(0);

  const totalUnreadMessages = useChatStore(state => state.totalUnreadMessages);

  useEffect(() => {
    const countFromObjectChatUnreadMessages: number = Object.values(
      totalUnreadMessages
    ).reduce((acc, count) => (acc += count), 0);

    if (countFromObjectChatUnreadMessages === countChatUnreadMessages) {
      return;
    } else {
      setCountChatUnreadMessages(countFromObjectChatUnreadMessages);
    }
  }, [totalUnreadMessages, countChatUnreadMessages]);

  return countChatUnreadMessages !== 0 ? countChatUnreadMessages : null;
};

export default useCountChatUnreadMessages;
