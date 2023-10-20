import { StateCreator } from 'zustand';
import { produce } from 'immer';
import { DocumentData } from 'firebase/firestore';

import { IMessageEditingState } from '@interfaces/zustand/IMessageEditingState';

const createMessageEditingFormState: StateCreator<
  IMessageEditingState
> = set => ({
  editingMessageInfo: null,
  updateEditingMessage: (messageInfo: {
    selectedMessage: DocumentData;
    isLastMessage: boolean;
  }) => {
    set(
      produce(state => {
        state.editingMessageInfo = messageInfo;
      })
    );
  },
  resetEditingMessage: () => {
    set(
      produce(state => {
        state.editingMessageInfo = null;
      })
    );
  },
});

export default createMessageEditingFormState;
