import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import SearchInput from '@components/Inputs/SearchInput/SearchInput';

import useChatStore from '@store/store';

import { defaultNS } from '@i18n/i18n';

const SearchUsers: FC = () => {
  const { t } = useTranslation(defaultNS, { keyPrefix: 'General' });

  const searchValue = useChatStore(state => state.searchValue);
  const updateSearchValue = useChatStore(state => state.updateSearchValue);

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchValue(e.target.value);
  };

  return (
    <SearchInput
      value={searchValue}
      handleChange={handleChangeSearchValue}
      placeholderText={t('Search')}
      autoFocus={false}
    />
  );
};

export default SearchUsers;
