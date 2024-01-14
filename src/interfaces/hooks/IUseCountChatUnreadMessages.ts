import { IUnreadMessages } from "../IUnreadMessages";

export interface IUseCountChatUnreadMessages {
  (chatUnreadMessages: IUnreadMessages): number;
}