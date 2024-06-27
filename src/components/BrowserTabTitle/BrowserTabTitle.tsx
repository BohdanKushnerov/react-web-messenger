import type { FC } from 'react';

import useBrowserTabTitleVisibilityChange from '@hooks/useBrowserTabTitleChange';
import useCountChatUnreadMessages from '@hooks/useCountChatUnreadMessages';

import type { IBrowserTabTitleProps } from '@interfaces/IBrowserTabTitleProps';

const BrowserTabTitle: FC<IBrowserTabTitleProps> = ({ docHidden }) => {
  const countChatUnreadMessages = useCountChatUnreadMessages();
  useBrowserTabTitleVisibilityChange(countChatUnreadMessages, docHidden);

  return null;
};

export default BrowserTabTitle;
