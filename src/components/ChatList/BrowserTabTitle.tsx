import { FC } from 'react';

import useChatStore from '@zustand/store';
import useBrowserTabTitleVisibilityChange from '@hooks/useBrowserTabTitleVisibilityChange';
import useCountChatUnreadMessages from '@hooks/useCountChatUnreadMessages';

const BrowserTabTitle: FC = () => {
  const totalUnreadMessages = useChatStore(state => state.totalUnreadMessages);

  const countChatUnreadMessages =
    useCountChatUnreadMessages(totalUnreadMessages); // дает количество непрочитаных сообщений вцелом
  useBrowserTabTitleVisibilityChange(countChatUnreadMessages); // смена тайтла вкладки когда вкладка неактивная и есть непрочитанные сообщения

  return null;
};

export default BrowserTabTitle;
