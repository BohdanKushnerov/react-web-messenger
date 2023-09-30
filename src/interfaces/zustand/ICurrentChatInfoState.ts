import { TCurrentChatInfo } from "types/TCurrentChatInfo";

export interface ICurrentChatInfoState {
  currentChatInfo: {
    chatUID: string | null;
    userUID: string | null;
    // userInfo: {
    //   photoURL: string | null;
    //   displayName: string | null;
    //   uid: string | null;
    // };
  };
  updateCurrentChatInfo: (chat: TCurrentChatInfo) => void;
  resetCurrentChatInfo: () => void;
}
