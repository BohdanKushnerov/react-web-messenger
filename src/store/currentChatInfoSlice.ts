import { produce } from 'immer';
import type { StateCreator } from 'zustand';

import type { ISelectedChatInfo } from '@interfaces/ISelectedChatInfo';
import type { ICurrentChatInfoState } from '@interfaces/store/ICurrentChatInfoState';

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
