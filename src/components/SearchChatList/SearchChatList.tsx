import { useState, useEffect } from 'react';
import {
  DocumentData,
  QuerySnapshot,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import AvatarProfile from '@components/AvatarProfile/AvatarProfile';
import { db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import capitalizeName from '@utils/capitalizeFirstLetterName';
import handleCreateChat from '@utils/handleCreateChat';
import { TScreen } from 'types/TScreen';

interface IChatList {
  setScreen?: (value: TScreen) => void;
}

function SearchChatList({ setScreen }: IChatList) {
  const [searchChatList, setSearchChatList] = useState<QuerySnapshot<
    DocumentData,
    DocumentData
  > | null>(null);
  const navigate = useNavigate();

  const searchValue = useChatStore(state => state.searchValue);
  const updateSearchValue = useChatStore(state => state.updateSearchValue);
  const currentUser = useChatStore(state => state.currentUser);
  const updateCurrentChatInfo = useChatStore(
    state => state.updateCurrentChatInfo
  );

  // юзефект для поиска контактов(юзеров) в поисковой строке
  useEffect(() => {
    const fetchSearchUsers = async () => {
      if (searchValue.trim() === '') {
        setSearchChatList(null);
        return;
      }

      const queryName = capitalizeName(searchValue).trim();

      const usersRef = collection(db, 'users');
      const q = query(
        usersRef,
        where('displayName', '>=', queryName),
        where('displayName', '<=', queryName + '\uf8ff')
      );

      try {
        const querySnapshot = await getDocs(q);

        setSearchChatList(querySnapshot);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSearchUsers();
  }, [searchValue]);

  const handleManageCreateChat = (docData: DocumentData) => {
    handleCreateChat(docData, updateCurrentChatInfo, navigate);

    setSearchChatList(null);
    updateSearchValue('');

    if (setScreen) {
      setScreen('Chat');
    }
  };

  return (
    <div>
      <ul className="bg-myBlackBcg">
        {/* тут список юзеров в поиске */}
        {searchChatList &&
          searchChatList.docs.map(doc => {
            console.log('chatList search doc', doc.data());
            // фильтруем себя
            if (doc.data().uid === currentUser.uid) return;

            const docData: DocumentData = doc.data();

            return (
              <li
                className="flex items-center content-center gap-3 h-72px p-2"
                key={doc.id}
                onClick={() => handleManageCreateChat(docData)}
              >
                <AvatarProfile
                  photoURL={doc.data()?.photoURL}
                  displayName={doc.data()?.displayName}
                  size="50"
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
