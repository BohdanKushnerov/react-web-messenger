import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import ChatListItem from '@components/Sidebar/ChatListItem/ChatListItem';
import useMyUserChatList from '@hooks/useMyUserChatList';
import { ChatListItemType } from 'types/ChatListItemType';
import LoaderUIActions from '@components/LoaderUIActions/LoaderUIActions';

const ChatList: FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'Sidebar' });

  const { isLoading, myUserChatList } = useMyUserChatList(); // загрузка списка моих чатов

  console.log('screen --> ChatList', myUserChatList);

  return (
    <div>
      {isLoading && (
        <div className="flex justify-center">
          <LoaderUIActions size={100} />
        </div>
      )}
      {!isLoading && myUserChatList && myUserChatList.length > 0 ? (
        <ul className="h-full p-0 m-0">
          {myUserChatList &&
            myUserChatList.map((chatInfo: ChatListItemType) => (
              <ChatListItem key={chatInfo[0]} chatInfo={chatInfo} />
            ))}
        </ul>
      ) : (
        <>
          {!isLoading && (
            <div>
              <p className="text-center font-black text-black dark:text-white">
                {t('NoChats')}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChatList;
