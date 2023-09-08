import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import createSearchUsersState from './searchUsersSlice'
import createAuthSliceState from './authSlice';
import createChatSliceState from './chatSlice';
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

interface ChatSliceState {
  chatUID: string | null;
  updateChatUID: (id: string) => void;
}

const useChatStore = create<
  SearchUsersState & AuthSliceState & ChatSliceState
>()(
  devtools((...a) => ({
    ...createSearchUsersState(...a),
    ...createAuthSliceState(...a),
    ...createChatSliceState(...a),
  }))
);

// const useChatStore = create(
//   devtools((...a) => ({
//     ...createSearchUsersState(...a),
//     ...createAuthSliceState(...a),
//   }))
// );

export default useChatStore;
