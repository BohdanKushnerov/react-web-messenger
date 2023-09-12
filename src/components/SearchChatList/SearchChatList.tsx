import useChatStore from '@zustand/store';
import {
  DocumentData,
  QuerySnapshot,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import capitalizeName from '@components/Search/utils/capitalizeFirstLetterName';
import { db } from '@myfirebase/config';
import handleCreateChat from './utils/handleCreateChat';

export default function SearchChatList() {
  const [searchChatList, setSearchChatList] = useState<
    QuerySnapshot<DocumentData, DocumentData> | []
  >([]);

  const searchValue = useChatStore(state => state.searchValue);
  const updateSearchValue = useChatStore(state => state.updateSearchValue);
  const currentUser = useChatStore(state => state.currentUser);

  // юзефект для поиска контактов(юзеров) в поисковой строке
  useEffect(() => {
    const fetchData = async () => {
      if (searchValue.trim() === '') {
        setSearchChatList([]);
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
        {searchChatList instanceof QuerySnapshot &&
          searchChatList.docs.map(doc => {
            console.log('chatList search doc', doc.data());
            // фильтруем себя
            if (doc.data().uid === currentUser.uid) return

              return (
                <li
                  className="flex"
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
                    width={24}
                    height={24}
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
