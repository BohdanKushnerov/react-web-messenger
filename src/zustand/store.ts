import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import createSearchUsersState from './searchUsersSlice'
import createAuthSliceState from './authSlice';
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

const useChatStore = create<SearchUsersState & AuthSliceState>()(
  devtools((...a) => ({
    ...createSearchUsersState(...a),
    ...createAuthSliceState(...a),
  }))
);

// const useChatStore = create(
//   devtools((...a) => ({
//     ...createSearchUsersState(...a),
//     ...createAuthSliceState(...a),
//   }))
// );

export default useChatStore;
