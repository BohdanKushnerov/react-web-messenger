import { ChatListItemType } from "types/ChatListItemType";

export interface IUseUnreadMessages {
  (lengthOfMyUnreadMsgs: number, chatInfo: ChatListItemType): void;
}
