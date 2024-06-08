export interface IUseUnreadMessages {
  (lengthOfMyUnreadMsgs: number, chatUID: string): void;
}
