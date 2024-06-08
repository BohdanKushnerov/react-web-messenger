import { DocumentData } from 'firebase/firestore';

import { ChatListItemType } from 'types/ChatListItemType';

export interface IUserChatInfoProps {
  currentChatUID: string | null;
  chatInfo: ChatListItemType;
  userInfo: DocumentData | null;
}
