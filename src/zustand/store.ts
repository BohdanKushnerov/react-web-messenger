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

import { IAuthSliceState } from '@interfaces/zustand/IAuthSliceState';
import { ICreateisSelectedMessagesState } from '@interfaces/zustand/ICreateisSelectedMessagesState';
import { ICurrentChatInfoState } from '@interfaces/zustand/ICurrentChatInfoState';
import { IMessageChatForm } from '@interfaces/zustand/IMessageChatForm';
import { IMessageEditingState } from '@interfaces/zustand/IMessageEditingState';
import { ISearchUsersState } from '@interfaces/zustand/ISearchUsersState';
import { ISidebarScreenState } from '@interfaces/zustand/ISidebarScreen';
import { ITotalUnreadMessagesState } from '@interfaces/zustand/ITotalUnreadMessagesState';

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
