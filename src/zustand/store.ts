import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import createSearchUsersState from './searchUsersSlice';
import createAuthSliceState from './authSlice';
import createCurrentChatInfoState from './currentChatInfoSlice';
import createSidebarScreenState from './sidebarScreenState';

import { IAuthSliceState } from '@interfaces/zustand/IAuthSliceState';
import { ISearchUsersState } from '@interfaces/zustand/ISearchUsersState';
import { ICurrentChatInfoState } from '@interfaces/zustand/ICurrentChatInfoState';
import { ISidebarScreen } from '@interfaces/zustand/ISidebarScreen';

const useChatStore = create<
  ISearchUsersState & IAuthSliceState & ICurrentChatInfoState & ISidebarScreen
>()(
  devtools((...a) => ({
    ...createSearchUsersState(...a),
    ...createAuthSliceState(...a),
    ...createCurrentChatInfoState(...a),
    ...createSidebarScreenState(...a),
  }))
);

export default useChatStore;
