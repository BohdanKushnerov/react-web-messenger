import { Search } from '../Inputs/Search/Search';
import useChatStore from '@zustand/store';

const SearchUsers = () => {
  const searchValue = useChatStore(state => state.searchValue);
  const updateSearchValue = useChatStore(state => state.updateSearchValue);

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchValue(e.target.value);
  };

  return <Search value={searchValue} handleChange={handleChangeSearchValue} />;
}

export default SearchUsers;
