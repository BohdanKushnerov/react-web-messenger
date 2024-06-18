import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { DocumentData } from 'firebase/firestore';

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
            if (doc.data().uid === currentUser.uid) return null;

            const docData: DocumentData = doc.data();

            return (
              <li
                className="group flex h-72px content-center items-center gap-3 rounded-md p-2 transition-all duration-300 hover:cursor-pointer hover:bg-mediumZinc"
                key={doc.id}
                onClick={() => handleManageCreateChat(docData)}
              >
                <AvatarProfile
                  photoURL={docData.photoURL}
                  displayName={docData.displayName}
                  size="50"
                />
                <p className="font-semibold text-darkZinc dark:text-mediumZinc">
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
              <p className="font-black text-black dark:text-white">
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
