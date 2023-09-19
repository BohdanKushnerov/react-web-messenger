import { useState, useEffect } from 'react';
import {
  DocumentData,
  QuerySnapshot,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

import capitalizeName from '@components/Search/utils/capitalizeFirstLetterName';
import { db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import handleCreateChat from './utils/handleCreateChat';


function SearchChatList() {
  const [searchChatList, setSearchChatList] = useState<
    QuerySnapshot<DocumentData, DocumentData> | null
  >(null);

  const searchValue = useChatStore(state => state.searchValue);
  const updateSearchValue = useChatStore(state => state.updateSearchValue);
  const currentUser = useChatStore(state => state.currentUser);

  // юзефект для поиска контактов(юзеров) в поисковой строке
  useEffect(() => {
    const fetchData = async () => {
      if (searchValue.trim() === '') {
        setSearchChatList(null);
        return;
      }

      const queryName = capitalizeName(searchValue);

      const usersRef = collection(db, 'users');
      const q = query(
        usersRef,
        where('displayName', '>=', queryName),
        where('displayName', '<=', queryName + '\uf8ff'),
      );

      try {
        const querySnapshot = await getDocs(q);

        setSearchChatList(querySnapshot);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchValue]);

  return (
    <div>
      <ul className="bg-myBlackBcg">
        {/* тут список юзеров в поиске */}
        {searchChatList &&
          searchChatList.docs.map(doc => {
            console.log('chatList search doc', doc.data());
            // фильтруем себя
            if (doc.data().uid === currentUser.uid) return;

            return (
              <li
                className="flex items-center content-center gap-3 h-72px"
                key={doc.id}
                onClick={() =>
                  handleCreateChat(
                    doc.data(),
                    setSearchChatList,
                    updateSearchValue
                  )
                }
              >
                <img
                  width={50}
                  height={50}
                  src={doc.data().photoURL}
                  alt={doc.data().displayName}
                />

                <p className="text-white">{doc.data().displayName}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default SearchChatList;