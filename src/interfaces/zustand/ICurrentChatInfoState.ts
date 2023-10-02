import { TCurrentChatInfo } from "types/TCurrentChatInfo";

export interface ICurrentChatInfoState {
  currentChatInfo: {
    chatUID: string | null;
    userUID: string | null;
  };
  updateCurrentChatInfo: (chat: TCurrentChatInfo) => void;
  resetCurrentChatInfo: () => void;
}
