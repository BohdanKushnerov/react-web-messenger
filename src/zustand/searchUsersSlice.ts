import { produce } from 'immer';
import { StateCreator } from 'zustand';

import { ISearchUsersState } from '@interfaces/zustand/ISearchUsersState';

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
