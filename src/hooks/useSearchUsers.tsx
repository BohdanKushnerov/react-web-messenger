import { useCallback, useEffect, useState } from 'react';

import type { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useDebounce } from 'use-debounce';

import { db } from '@myfirebase/config';

import useChatStore from '@zustand/store';

const useSearchUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchChatList, setSearchChatList] = useState<QuerySnapshot<
    DocumentData,
    DocumentData
  > | null>(null);

  const searchValue = useChatStore(state => state.searchValue);

  const [debauncedSearchValue] = useDebounce(searchValue, 300);

  useEffect(() => {
    if (debauncedSearchValue.trim() === '') {
      setSearchChatList(null);
      return;
    }

    const fetchSearchUsers = async () => {
      setIsLoading(true);
      const queryName = debauncedSearchValue.trim();

      const usersRef = collection(db, 'users');
      const queryParams = query(
        usersRef,
        where('displayName', '>=', queryName),
        where('displayName', '<=', `${queryName}\uf8ff`)
      );

      try {
        const querySnapshot = await getDocs(queryParams);

        setSearchChatList(querySnapshot);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchUsers();

    return () => {
      setSearchChatList(null);
    };
  }, [debauncedSearchValue]);

  const handleResetSearchChatList = useCallback(() => {
    setSearchChatList(null);
  }, []);

  return { isLoading, searchChatList, handleResetSearchChatList };
};

export default useSearchUsers;
