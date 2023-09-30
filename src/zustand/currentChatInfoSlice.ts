import { StateCreator } from 'zustand';
import { produce } from 'immer';

import { ICurrentChatInfoState } from '@interfaces/zustand/ICurrentChatInfoState';
import { TCurrentChatInfo } from 'types/TCurrentChatInfo';

const createCurrentChatInfoState: StateCreator<
  ICurrentChatInfoState
> = set => ({
  currentChatInfo: {
    chatUID: null,
    userUID: null,
    // userInfo: {
    //   photoURL: null,
    //   displayName: null,
    //   uid: null,
    // },
  },
  updateCurrentChatInfo: (chat: TCurrentChatInfo) => {
    set(
      produce(state => {
        state.currentChatInfo = {
          chatUID: chat[0],
          userUID: chat[1].userUID,
          // userInfo: {
          //   displayName: chat[1].userInfo.displayName,
          //   uid: chat[1].userInfo.uid,
          //   photoURL: chat[1].userInfo.photoURL,
          // },
        };
      })
    );
  },
  resetCurrentChatInfo: () => {
    set(
      produce(state => {
        state.currentChatInfo = {
          chatUID: null,
          userUID: null,
          // userInfo: {
          //   displayName: chat[1].userInfo.displayName,
          //   uid: chat[1].userInfo.uid,
          //   photoURL: chat[1].userInfo.photoURL,
          // },
        };
      })
    );
  }
});

export default createCurrentChatInfoState;
