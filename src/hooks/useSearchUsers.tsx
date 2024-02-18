import { useEffect, useState } from 'react';
import {
  DocumentData,
  QuerySnapshot,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

import { db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import capitalizeName from '@utils/searchChatList/capitalizeFirstLetterName';

const useSearchUsers = () => {
  const [searchChatList, setSearchChatList] = useState<QuerySnapshot<
    DocumentData,
    DocumentData
  > | null>(null);

  const searchValue = useChatStore(state => state.searchValue);

  useEffect(() => {
    const fetchSearchUsers = async () => {
      if (searchValue.trim() === '') {
        setSearchChatList(null);
        return;
      }

      const queryName = capitalizeName(searchValue).trim();

      const usersRef = collection(db, 'users');
      const queryParams = query(
        usersRef,
        where('displayName', '>=', queryName),
        where('displayName', '<=', queryName + '\uf8ff')
      );

      try {
        const querySnapshot = await getDocs(queryParams);

        setSearchChatList(querySnapshot);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSearchUsers();
  }, [searchValue]);

  return { searchChatList, setSearchChatList };
};

export default useSearchUsers;
