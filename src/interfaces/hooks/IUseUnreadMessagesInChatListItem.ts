import { Dispatch, SetStateAction } from "react";

import { IUnreadMessages } from "../IUnreadMessages";
import { ChatListItemType } from "types/ChatListItemType";

export interface IUseUnreadMessagesInChatListItem {
  (
    lengthOfMyUnreadMsgs: number,
    setChatUnreadMessages: Dispatch<SetStateAction<IUnreadMessages>>,
    chatInfo: ChatListItemType
  ): void;
}