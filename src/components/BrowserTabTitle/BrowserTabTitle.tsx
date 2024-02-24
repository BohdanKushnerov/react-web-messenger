import { FC } from 'react';

import useChatStore from '@zustand/store';
import useBrowserTabTitleVisibilityChange from '@hooks/useBrowserTabTitleChange';
import useCountChatUnreadMessages from '@hooks/useCountChatUnreadMessages';
import { IBrowserTabTitleProps } from '@interfaces/IBrowserTabTitleProps';

const BrowserTabTitle: FC<IBrowserTabTitleProps> = ({ docHidden }) => {
  const totalUnreadMessages = useChatStore(state => state.totalUnreadMessages);

  const countChatUnreadMessages =
    useCountChatUnreadMessages(totalUnreadMessages); // дает количество непрочитаных сообщений вцелом
  useBrowserTabTitleVisibilityChange(countChatUnreadMessages, docHidden); // смена тайтла вкладки когда вкладка неактивная и есть непрочитанные сообщения

  return null;
};

export default BrowserTabTitle;
