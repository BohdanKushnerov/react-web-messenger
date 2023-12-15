import { produce } from 'immer';
import { StateCreator } from 'zustand';

import { IMessageChatForm } from '@interfaces/zustand/IMessageChatForm';

const createMessageChatForm: StateCreator<IMessageChatForm> = set => ({
  message: '',
  setMessage: (msg: string | ((prevState: string) => string)) => {
    set(
      produce(state => {
        state.message =
          typeof msg === 'function'
            ? (msg as (prev: string) => string)(state.message)
            : msg;
      })
    );
  },
});

export default createMessageChatForm;
