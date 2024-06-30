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

import type { IAuthSliceState } from '@interfaces/store/IAuthSliceState';
import type { ICreateisSelectedMessagesState } from '@interfaces/store/ICreateisSelectedMessagesState';
import type { ICurrentChatInfoState } from '@interfaces/store/ICurrentChatInfoState';
import type { IMessageChatForm } from '@interfaces/store/IMessageChatForm';
import type { IMessageEditingState } from '@interfaces/store/IMessageEditingState';
import type { ISearchUsersState } from '@interfaces/store/ISearchUsersState';
import type { ISidebarScreenState } from '@interfaces/store/ISidebarScreen';
import type { ITotalUnreadMessagesState } from '@interfaces/store/ITotalUnreadMessagesState';

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
