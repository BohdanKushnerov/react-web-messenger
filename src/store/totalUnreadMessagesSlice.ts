import { produce } from 'immer';
import type { StateCreator } from 'zustand';

import type { ITotalUnreadMessagesState } from '@interfaces/zustand/ITotalUnreadMessagesState';

const createTotalUnreadMessagesState: StateCreator<
  ITotalUnreadMessagesState
> = set => ({
  totalUnreadMessages: {},
  updateTotalUnreadMessages: updateData => {
    set(
      produce((state: ITotalUnreadMessagesState) => {
        state.totalUnreadMessages = {
          ...state.totalUnreadMessages,
          ...updateData,
        };
      })
    );
  },
});

export default createTotalUnreadMessagesState;
