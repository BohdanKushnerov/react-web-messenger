import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import createSearchUsersState from './searchUsersSlice'
import createAuthSliceState from './authSlice';
import createCurrentChatInfoState from './currentChatInfoSlice';
import { User } from 'firebase/auth';

interface SearchUsersState {
  searchValue: string;
  updateSearchValue: (value: string) => void;
  resetSearchValue: () => void;
}

interface AuthSliceState {
  isLoggedIn: boolean;
  currentUser: {
    uid: string | null;
    displayName: string | null;
  };
  updateCurrentUser: (user: User | null) => void;
}

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

const useChatStore = create<
  SearchUsersState & AuthSliceState & currentChatInfoState
>()(
  devtools((...a) => ({
    ...createSearchUsersState(...a),
    ...createAuthSliceState(...a),
    ...createCurrentChatInfoState(...a),
  }))
);

export default useChatStore;
