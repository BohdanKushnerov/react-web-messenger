import { StateCreator } from 'zustand';
import { produce } from 'immer';

interface ChatSliceState {
  chatUID: string | null;
  updateChatUID: (id: string)=> void;
}

const createChatSliceState: StateCreator<ChatSliceState> = set => ({
  chatUID: null,
  updateChatUID: (id: string) => {
    set(
      produce(state => {
        state.chatUID = id;
      })
    );
  },
});

export default createChatSliceState;
