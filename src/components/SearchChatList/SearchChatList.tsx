import { FC } from 'react';
import { DocumentData } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import AvatarProfile from '@components/AvatarProfile/AvatarProfile';
import useChatStore from '@zustand/store';
import useSearchUsers from '@hooks/useSearchUsers';
import handleCreateChat from '@utils/handleCreateChat';

const SearchChatList: FC = () => {
  const navigate = useNavigate();

  const updateSearchValue = useChatStore(state => state.updateSearchValue);
  const currentUser = useChatStore(state => state.currentUser);
  const updateCurrentChatInfo = useChatStore(
    state => state.updateCurrentChatInfo
  );

  const { searchChatList, setSearchChatList } = useSearchUsers(); // поиск контактов(юзеров) в поисковой строке

    console.log('screen --> SearchChatList');


  const handleManageCreateChat = (docData: DocumentData) => {
    handleCreateChat(docData, updateCurrentChatInfo, navigate);

    setSearchChatList(null);
    updateSearchValue('');
  };

  return (
    <div>
      <ul className="">
        {/* тут список юзеров в поиске */}
        {searchChatList &&
          searchChatList.docs.map(doc => {
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
                <p className="text-zinc-600 dark:text-textSecondary">
                  {doc.data().displayName}
                </p>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default SearchChatList;
