import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import createAuthSliceState from './authSlice';
import createCurrentChatInfoState from './currentChatInfoSlice';
import createMessageChatForm from './messageChatForm';
import createMessageEditingFormState from './messageEditingFormState';
import createSearchUsersState from './searchUsersSlice';
import createIsSelectedMessagesState from './selectedMessages';
import createSidebarScreenState from './sidebarScreenSlice';
import createTotalUnreadMessagesState from './totalUnreadMessagesSlice';

import type { IAuthSliceState } from '@interfaces/zustand/IAuthSliceState';
import type { ICreateisSelectedMessagesState } from '@interfaces/zustand/ICreateisSelectedMessagesState';
import type { ICurrentChatInfoState } from '@interfaces/zustand/ICurrentChatInfoState';
import type { IMessageChatForm } from '@interfaces/zustand/IMessageChatForm';
import type { IMessageEditingState } from '@interfaces/zustand/IMessageEditingState';
import type { ISearchUsersState } from '@interfaces/zustand/ISearchUsersState';
import type { ISidebarScreenState } from '@interfaces/zustand/ISidebarScreen';
import type { ITotalUnreadMessagesState } from '@interfaces/zustand/ITotalUnreadMessagesState';

const useChatStore = create<
  ISearchUsersState &
    IAuthSliceState &
    ICurrentChatInfoState &
    ISidebarScreenState &
    IMessageEditingState &
    IMessageChatForm &
    ITotalUnreadMessagesState &
    ICreateisSelectedMessagesState
>()(
  devtools((...a) => ({
    ...createSearchUsersState(...a),
    ...createAuthSliceState(...a),
    ...createCurrentChatInfoState(...a),
    ...createSidebarScreenState(...a),
    ...createMessageEditingFormState(...a),
    ...createMessageChatForm(...a),
    ...createTotalUnreadMessagesState(...a),
    ...createIsSelectedMessagesState(...a),
  }))
);

export default useChatStore;
