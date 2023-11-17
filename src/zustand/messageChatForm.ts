import { produce } from 'immer';
import { StateCreator } from 'zustand';

import { IMessageChatForm } from '@interfaces/zustand/IMessageChatForm';

const createMessageChatForm: StateCreator<IMessageChatForm> = set => ({
  message: '',
  setMessage: (msg: string) => {
    set(
      produce(state => {
        state.message = msg;
      })
    );
  },
  resetMessage: () => {
    set(
      produce(state => {
        state.message = '';
      })
    );
  },
});

export default createMessageChatForm;
