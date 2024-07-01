import type { DocumentData } from 'firebase/firestore';
import { produce } from 'immer';
import type { StateCreator } from 'zustand';

import type { IMessageEditingState } from '@interfaces/store/IMessageEditingState';

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
