import { DocumentData } from 'firebase/firestore';
import { produce } from 'immer';
import { StateCreator } from 'zustand';

import { IMessageEditingState } from '@interfaces/zustand/IMessageEditingState';

const createMessageEditingFormState: StateCreator<
  IMessageEditingState
> = set => ({
  editingMessageInfo: null,
  updateEditingMessage: (messageInfo: { selectedMessage: DocumentData }) => {
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
