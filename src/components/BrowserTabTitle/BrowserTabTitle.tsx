import type { FC } from 'react';

import useBrowserTabTitleVisibilityChange from '@hooks/browserTabTitle/useBrowserTabTitleChange';
import useCountUnreadMessagesAllChats from '@hooks/browserTabTitle/useCountUnreadMessagesAllChats';

interface IBrowserTabTitleProps {
  docHidden: boolean;
}
const BrowserTabTitle: FC<IBrowserTabTitleProps> = ({ docHidden }) => {
  const countChatUnreadMessages = useCountUnreadMessagesAllChats();
  useBrowserTabTitleVisibilityChange(countChatUnreadMessages, docHidden);

  return null;
};

export default BrowserTabTitle;
