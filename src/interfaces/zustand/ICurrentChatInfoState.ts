import { ISelectedChatInfo } from '@interfaces/ISelectedChatInfo';

export interface ICurrentChatInfoState {
  currentChatInfo: {
    chatUID: string | null;
    userUID: string | null;
    tokenFCM: string | null;
  };
  updateCurrentChatInfo: (chat: ISelectedChatInfo) => void;
  resetCurrentChatInfo: () => void;
}
