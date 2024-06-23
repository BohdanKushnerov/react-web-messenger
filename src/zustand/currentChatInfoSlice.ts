import { produce } from 'immer';
import { StateCreator } from 'zustand';

import { ISelectedChatInfo } from '@interfaces/ISelectedChatInfo';
import { ICurrentChatInfoState } from '@interfaces/zustand/ICurrentChatInfoState';

const createCurrentChatInfoState: StateCreator<
  ICurrentChatInfoState
> = set => ({
  currentChatInfo: {
    chatUID: null,
    userUID: null,
    tokenFCM: null,
  },
  updateCurrentChatInfo: (chat: ISelectedChatInfo) => {
    set(
      produce(state => {
        state.currentChatInfo = {
          chatUID: chat.chatUID,
          userUID: chat.userUID,
          tokenFCM: chat.tokenFCM,
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
          tokenFCM: null,
        };
      })
    );
  },
});

export default createCurrentChatInfoState;
