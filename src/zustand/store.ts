import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import createSearchUsersState from './searchUsersSlice';
import createAuthSliceState from './authSlice';
import createCurrentChatInfoState from './currentChatInfoSlice';
import createSidebarScreenState from './sidebarScreenSlice';
import createMessageEditingFormState from './messageEditingFormState';
import createMessageChatForm from './messageChatForm';
import createTotalUnreadMessagesState from './totalUnreadMessagesSlice';
import createIsSelectedMessagesState from './selectedMessages';

import { ISearchUsersState } from '@interfaces/zustand/ISearchUsersState';
import { IAuthSliceState } from '@interfaces/zustand/IAuthSliceState';
import { ICurrentChatInfoState } from '@interfaces/zustand/ICurrentChatInfoState';
import { ISidebarScreenState } from '@interfaces/zustand/ISidebarScreen';
import { IMessageEditingState } from '@interfaces/zustand/IMessageEditingState';
import { IMessageChatForm } from '@interfaces/zustand/IMessageChatForm';
import { ITotalUnreadMessagesState } from '@interfaces/zustand/ITotalUnreadMessagesState';
import { ICreateisSelectedMessagesState } from '@interfaces/zustand/ICreateisSelectedMessagesState';

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
