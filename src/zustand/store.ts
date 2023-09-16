import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import createSearchUsersState from './searchUsersSlice';
import createAuthSliceState from './authSlice';
import createCurrentChatInfoState from './currentChatInfoSlice';
import { IAuthSliceState } from '@interfaces/zustand/IAuthSliceState';
import { ISearchUsersState } from '@interfaces/zustand/ISearchUsersState';
import { ICurrentChatInfoState } from '@interfaces/zustand/ICurrentChatInfoState';

const useChatStore = create<
  ISearchUsersState & IAuthSliceState & ICurrentChatInfoState
>()(
  devtools((...a) => ({
    ...createSearchUsersState(...a),
    ...createAuthSliceState(...a),
    ...createCurrentChatInfoState(...a),
  }))
);

export default useChatStore;
