import { produce } from 'immer';
import type { StateCreator } from 'zustand';

import type { ISearchUsersState } from '@interfaces/zustand/ISearchUsersState';

const createSearchUsersState: StateCreator<ISearchUsersState> = set => ({
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
