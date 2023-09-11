import { TChatListItem } from 'types/TChatListItem';

export interface ICurrentChatInfoState {
  currentChatInfo: {
    chatUID: string | null;
    userInfo: {
      photoURL: string | null;
      displayName: string | null;
      uid: string | null;
    };
  };
  updateCurrentChatInfo: (chat: TChatListItem) => void;
}
