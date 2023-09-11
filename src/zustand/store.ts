import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import createSearchUsersState from './searchUsersSlice';
import createAuthSliceState from './authSlice';
import createCurrentChatInfoState from './currentChatInfoSlice';
import { IAuthSliceState } from '@interfaces/IAuthSliceState';
import { ISearchUsersState } from '@interfaces/ISearchUsersState';
import { ICurrentChatInfoState } from '@interfaces/ICurrentChatInfoState';

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
