import { Dispatch, SetStateAction } from 'react';

import { IUnreadMessages } from './IUnreadMessages';
import { ChatListItemType } from 'types/ChatListItemType';

export interface IChatListItemProps {
  chatInfo: ChatListItemType;
  setChatUnreadMessages: Dispatch<SetStateAction<IUnreadMessages>>;
}
