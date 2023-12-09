import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import createSearchUsersState from './searchUsersSlice';
import createAuthSliceState from './authSlice';
import createCurrentChatInfoState from './currentChatInfoSlice';
import createSidebarScreenState from './sidebarScreenSlice';
import createMessageEditingFormState from './messageEditingFormState';
import createMessageChatForm from './messageChatForm';
import { ISearchUsersState } from '@interfaces/zustand/ISearchUsersState';
import { IAuthSliceState } from '@interfaces/zustand/IAuthSliceState';
import { ICurrentChatInfoState } from '@interfaces/zustand/ICurrentChatInfoState';
import { ISidebarScreenState } from '@interfaces/zustand/ISidebarScreen';
import { IMessageEditingState } from '@interfaces/zustand/IMessageEditingState';
import { IMessageChatForm } from '@interfaces/zustand/IMessageChatForm';

const useChatStore = create<
  ISearchUsersState &
    IAuthSliceState &
    ICurrentChatInfoState &
    ISidebarScreenState &
    IMessageEditingState &
    IMessageChatForm
>()(
  devtools((...a) => ({
    ...createSearchUsersState(...a),
    ...createAuthSliceState(...a),
    ...createCurrentChatInfoState(...a),
    ...createSidebarScreenState(...a),
    ...createMessageEditingFormState(...a),
    ...createMessageChatForm(...a),
  }))
);

export default useChatStore;
