import { StateCreator } from 'zustand';
import { produce } from 'immer';
import { TChatListItem } from 'types/TChatListItem';
import { ICurrentChatInfoState } from '@interfaces/ICurrentChatInfoState';

const createCurrentChatInfoState: StateCreator<
  ICurrentChatInfoState
> = set => ({
  currentChatInfo: {
    chatUID: null,
    userInfo: {
      photoURL: null,
      displayName: null,
      uid: null,
    },
  },
  updateCurrentChatInfo: (chat: TChatListItem) => {
    set(
      produce(state => {
        state.currentChatInfo = {
          chatUID: chat[0],
          userInfo: {
            displayName: chat[1].userInfo.displayName,
            uid: chat[1].userInfo.uid,
            photoURL: chat[1].userInfo.photoURL,
          },
        };
      })
    );
  },
});

export default createCurrentChatInfoState;
