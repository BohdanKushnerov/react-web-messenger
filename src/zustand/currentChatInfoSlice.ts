import { StateCreator } from 'zustand';
import { produce } from 'immer';

// interface ChatSliceState {
//   chatUID: string | null;
//   updateChatUID: (id: string)=> void;
// }

// const createChatSliceState: StateCreator<ChatSliceState> = set => ({
//   chatUID: null,
//   updateChatUID: (id: string) => {
//     set(
//       produce(state => {
//         state.chatUID = id;
//       })
//       );
//     },
//   });

type ChatListItem = [
  string,
  {
    userInfo: {
      photoURL: string;
      displayName: string;
      uid: string;
    };
  }
];

interface currentChatInfoState {
  currentChatInfo: {
    chatUID: string | null;
    userInfo: {
      photoURL: string | null;
      displayName: string | null;
      uid: string | null;
    };
  };
  updateCurrentChatInfo: (chat: ChatListItem) => void;
}

const createCurrentChatInfoState: StateCreator<currentChatInfoState> = set => ({
  currentChatInfo: {
    chatUID: null,
    userInfo: {
      photoURL: null,
      displayName: null,
      uid: null,
    },
  },
  updateCurrentChatInfo: (chat: ChatListItem) => {
    set(
      produce(state => {
        state.currentChatInfo = {
          chatUID: chat[0],
          userInfo: {
            displayName: chat[1].userInfo.displayName,
            uid: chat[1].userInfo.uid,
            photoURL: chat[1].userInfo.photoURL,
          },
        };
      })
    );
  },
});

export default createCurrentChatInfoState;
