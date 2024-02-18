import { ChatListItemType } from '@myTypes';

export interface IUseUnreadMessagesInChatListItem {
  (lengthOfMyUnreadMsgs: number, chatInfo: ChatListItemType): void;
}
