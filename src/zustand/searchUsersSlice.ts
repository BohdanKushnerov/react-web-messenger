import { StateCreator } from 'zustand';
import { produce } from 'immer';

interface SearchUsersState {
  searchValue: string;
  updateSearchValue: (value: string) => void;
  resetSearchValue: () => void;
}

const createSearchUsersState: StateCreator<SearchUsersState> = set => ({
  searchValue: '',
  updateSearchValue: (value: string) => {
    set(
      produce(state => {
        state.searchValue = value;
      })
    );
  },
  resetSearchValue: () => {
    set(
      produce(state => {
        state.searchValue = '';
      })
    );
  },
});

export default createSearchUsersState;
