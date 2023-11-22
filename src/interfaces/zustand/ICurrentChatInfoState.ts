import { CurrentChatInfo } from 'types/CurrentChatInfo';

export interface ICurrentChatInfoState {
  currentChatInfo: {
    chatUID: string | null;
    userUID: string | null;
  };
  updateCurrentChatInfo: (chat: CurrentChatInfo) => void;
  resetCurrentChatInfo: () => void;
}
