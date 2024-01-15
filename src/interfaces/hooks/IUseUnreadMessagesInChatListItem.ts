import { ChatListItemType } from 'types/ChatListItemType';

export interface IUseUnreadMessagesInChatListItem {
  (
    lengthOfMyUnreadMsgs: number,
    chatInfo: ChatListItemType
  ): void;
}
