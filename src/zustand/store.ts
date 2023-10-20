import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import createSearchUsersState from './searchUsersSlice';
import createAuthSliceState from './authSlice';
import createCurrentChatInfoState from './currentChatInfoSlice';
import createSidebarScreenState from './sidebarScreenSlice';
import createMessageEditingFormState from './messageEditingFormSlice';

import { IAuthSliceState } from '@interfaces/zustand/IAuthSliceState';
import { ISearchUsersState } from '@interfaces/zustand/ISearchUsersState';
import { ICurrentChatInfoState } from '@interfaces/zustand/ICurrentChatInfoState';
import { ISidebarScreenState } from '@interfaces/zustand/ISidebarScreen';
import { IMessageEditingState } from '@interfaces/zustand/IMessageEditingState';

const useChatStore = create<
  ISearchUsersState &
    IAuthSliceState &
    ICurrentChatInfoState &
    ISidebarScreenState &
    IMessageEditingState
>()(
  devtools((...a) => ({
    ...createSearchUsersState(...a),
    ...createAuthSliceState(...a),
    ...createCurrentChatInfoState(...a),
    ...createSidebarScreenState(...a),
    ...createMessageEditingFormState(...a),
  }))
);

export default useChatStore;
