import { DocumentData } from 'firebase/firestore';
import { produce } from 'immer';
import { StateCreator } from 'zustand';

import { ICreateisSelectedMessagesState } from '@interfaces/zustand/ICreateisSelectedMessagesState';

const createIsSelectedMessagesState: StateCreator<
  ICreateisSelectedMessagesState
> = set => ({
  isSelectedMessages: false,
  selectedDocDataMessage: null,
  updateIsSelectedMessages: boolean => {
    set(
      produce(state => {
        state.isSelectedMessages = boolean;
      })
    );
  },
  updateSelectedDocDataMessage: msg => {
    set(
      produce(state => {
        state.selectedDocDataMessage =
          typeof msg === 'function'
            ? (msg as (prev: DocumentData[] | null) => DocumentData[] | null)(
                state.selectedDocDataMessage ?? []
              )
            : msg;
      })
    );
  },
  resetSelectedMessages: () => {
    set(
      produce(state => {
        state.isSelectedMessages = false;
        state.selectedDocDataMessage = null;
      })
    );
  },
});

export default createIsSelectedMessagesState;
