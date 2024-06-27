import type { DocumentData } from 'firebase/firestore';

import type { ChatListItemType } from 'types/ChatListItemType';

export interface IUserChatInfoProps {
  currentChatUID: string | null;
  chatInfo: ChatListItemType;
  userInfo: DocumentData | null;
}
