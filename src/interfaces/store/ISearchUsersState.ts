export interface ISearchUsersState {
  searchValue: string;
  updateSearchValue: (value: string) => void;
  resetSearchValue: () => void;
}
