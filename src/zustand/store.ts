import { create } from 'zustand';
import createSearchUsersState from './searchUsersSlice'

interface SearchUsersState {
  searchValue: string;
  updateSearchValue: (value: string) => void;
  resetSearchValue: () => void;
}

const useChatStore = create<SearchUsersState>()((...a) => ({
  ...createSearchUsersState(...a),
}));

export default useChatStore;
