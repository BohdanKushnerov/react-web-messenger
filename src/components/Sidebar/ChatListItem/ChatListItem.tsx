import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import UserChatInfo from './UserChatInfo/UserChatInfo';
import AvatarProfile from '@components/AvatarProfile/AvatarProfile';
import useChatStore from '@zustand/store';
import useChatInfo from '@hooks/useChatInfo';
import handleSelectChat from '@utils/chatListItem/handleSelectChat';
import { IChatListItemProps } from '@interfaces/IChatListItemProps';

const ChatListItem: FC<IChatListItemProps> = ({ chatInfo }) => {
  const location = useLocation();

  const { chatUID } = useChatStore(state => state.currentChatInfo);
  const updateCurrentChatInfo = useChatStore(
    state => state.updateCurrentChatInfo
  );

  const userInfo = useChatInfo(chatInfo[1].userUID);

  const handleManageSelectChat = () => {
    if (chatInfo[0]) {
      handleSelectChat(chatInfo, updateCurrentChatInfo);
    }
  };

  return (
    <li
      className="block w-full border border-inputChar border-l-transparent border-r-transparent p-2"
      onClick={handleManageSelectChat}
    >
      <Link
        className={`flex items-center content-center gap-3 h-[72px] p-1 rounded-md transition-all duration-300 group ${
          chatUID === chatInfo[0] &&
          'bg-zinc-700 hover:bg-zinc-600 dark:bg-cyan-600 hover:dark:bg-cyan-700'
        } ${
          chatUID !== chatInfo[0] && 'hover:bg-zinc-400 hover:dark:bg-zinc-700'
        } `}
        to={`/${chatInfo[0]}`}
        state={{ from: location }}
      >
        <AvatarProfile
          photoURL={userInfo?.photoURL}
          displayName={userInfo?.displayName}
          size="50"
        />

        <UserChatInfo
          currentChatUID={chatUID}
          chatInfo={chatInfo}
          userInfo={userInfo}
        />
      </Link>
    </li>
  );
};

export default ChatListItem;
