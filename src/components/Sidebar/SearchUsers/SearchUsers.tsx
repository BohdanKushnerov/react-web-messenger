import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import SearchMsgsInput from '@components/Inputs/SearchMsgsInput/SearchMsgsInput';
import useChatStore from '@zustand/store';
import '@i18n';

const SearchUsers: FC = () => {
  const { t } = useTranslation();

  const searchValue = useChatStore(state => state.searchValue);
  const updateSearchValue = useChatStore(state => state.updateSearchValue);

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchValue(e.target.value);
  };

  return (
    <SearchMsgsInput
      value={searchValue}
      handleChange={handleChangeSearchValue}
      placeholderText={t('Search')}
    />
  );
};

export default SearchUsers;
