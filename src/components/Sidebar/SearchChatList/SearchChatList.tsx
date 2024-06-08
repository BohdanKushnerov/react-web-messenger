import { FC } from 'react';
import { DocumentData } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import AvatarProfile from '@components/AvatarProfile/AvatarProfile';
import LoaderUIActions from '@components/LoaderUIActions/LoaderUIActions';
import useChatStore from '@zustand/store';
import useSearchUsers from '@hooks/useSearchUsers';
import handleCreateAndNavigateToChat from '@utils/chatListItem/handleCreateAndNavigateToChat';

const SearchChatList: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('translation', { keyPrefix: 'Sidebar' });

  const currentUser = useChatStore(state => state.currentUser);
  const updateSearchValue = useChatStore(state => state.updateSearchValue);
  const updateCurrentChatInfo = useChatStore(
    state => state.updateCurrentChatInfo
  );

  const { isLoading, searchChatList, handleResetSearchChatList } =
    useSearchUsers();

  const handleManageCreateChat = (docData: DocumentData) => {
    handleCreateAndNavigateToChat(docData, updateCurrentChatInfo, navigate);

    handleResetSearchChatList();
    updateSearchValue('');
  };

  return (
    <div className="px-2">
      {isLoading && <LoaderUIActions size={50} />}
      {!isLoading && searchChatList && searchChatList.size > 0 ? (
        <ul>
          {searchChatList.docs.map(doc => {
            // фильтруем себя
            if (doc.data().uid === currentUser.uid) return null;

            const docData: DocumentData = doc.data();

            return (
              <li
                className="flex items-center content-center gap-3 h-[72px] p-2 transition-all duration-300 group hover:bg-zinc-400 rounded-md hover:cursor-pointer"
                key={doc.id}
                onClick={() => handleManageCreateChat(docData)}
              >
                <AvatarProfile
                  photoURL={docData.photoURL}
                  displayName={docData.displayName}
                  size="50"
                />
                <p className="text-zinc-600 dark:text-zinc-400 font-semibold">
                  {docData.displayName}
                </p>
              </li>
            );
          })}
        </ul>
      ) : (
        <>
          {!isLoading && searchChatList && (
            <div>
              <p className="text-black dark:text-white font-black">
                {t('UsersNotFound')}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchChatList;
