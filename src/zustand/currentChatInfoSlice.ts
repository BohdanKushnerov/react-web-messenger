import { produce } from 'immer';
import { StateCreator } from 'zustand';

import { ICurrentChatInfoState } from '@interfaces/zustand/ICurrentChatInfoState';

import { CurrentChatInfo } from 'types/CurrentChatInfo';

const createCurrentChatInfoState: StateCreator<
  ICurrentChatInfoState
> = set => ({
  currentChatInfo: {
    chatUID: null,
    userUID: null,
  },
  updateCurrentChatInfo: (chat: CurrentChatInfo) => {
    set(
      produce(state => {
        state.currentChatInfo = {
          chatUID: chat[0],
          userUID: chat[1].userUID,
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
        };
      })
    );
  },
});

export default createCurrentChatInfoState;
