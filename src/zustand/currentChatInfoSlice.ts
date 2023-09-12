import { StateCreator } from 'zustand';
import { produce } from 'immer';
import { ICurrentChatInfoState } from '@interfaces/ICurrentChatInfoState';
import { TCurrentChatInfo } from 'types/TCurrentChatInfo';

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
  updateCurrentChatInfo: (chat: TCurrentChatInfo) => {
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
