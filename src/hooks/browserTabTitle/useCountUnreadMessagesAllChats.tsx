import { useEffect, useState } from 'react';

import useChatStore from '@store/store';

const useCountUnreadMessagesAllChats = () => {
  const [countUnreadMessagesAllChats, setCountUnreadMessagesAllChats] =
    useState<number>(0);

  const totalUnreadMessages = useChatStore(state => state.totalUnreadMessages);

  useEffect(() => {
    const countFromObjectChatUnreadMessages: number = Object.values(
      totalUnreadMessages
    ).reduce((acc, count) => (acc += count), 0);

    if (countFromObjectChatUnreadMessages === countUnreadMessagesAllChats) {
      return;
    } else {
      setCountUnreadMessagesAllChats(countFromObjectChatUnreadMessages);
    }
  }, [totalUnreadMessages, countUnreadMessagesAllChats]);

  return countUnreadMessagesAllChats !== 0 ? countUnreadMessagesAllChats : null;
};

export default useCountUnreadMessagesAllChats;
