import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import UserChatInfo from './UserChatInfo/UserChatInfo';

import AvatarProfile from '@components/AvatarProfile/AvatarProfile';
import BlurImage from '@components/BlurImage/BlurImage';

import useChatStore from '@zustand/store';

import useBlurLoadingImage from '@hooks/useBlurLoadingImage';
import useChatInfo from '@hooks/useChatInfo';

import handleSelectChat from '@utils/chatListItem/handleSelectChat';

import { IChatListItemProps } from '@interfaces/IChatListItemProps';
import { ISelectedChatInfo } from '@interfaces/ISelectedChatInfo';

const ChatListItem: FC<IChatListItemProps> = ({ chatInfo }) => {
  const location = useLocation();

  const { chatUID } = useChatStore(state => state.currentChatInfo);
  const updateCurrentChatInfo = useChatStore(
    state => state.updateCurrentChatInfo
  );

  const userInfo = useChatInfo(chatInfo[1].userUID);
  const loadingImg = useBlurLoadingImage(userInfo?.photoURL);

  const handleManageSelectChat = () => {
    if (chatInfo[0]) {
      const selectedChatInfo: ISelectedChatInfo = {
        chatUID: chatInfo[0],
        userUID: chatInfo[1].userUID,
        tokenFCM: userInfo?.tokenFCM as string,
      };

      handleSelectChat(selectedChatInfo, updateCurrentChatInfo);
    }
  };

  return (
    <li
      className="block w-full border border-charcoal border-l-transparent border-r-transparent p-2"
      onClick={handleManageSelectChat}
    >
      <Link
        className={`group flex h-72px content-center items-center gap-3 rounded-md p-1 transition-all duration-300 ${
          chatUID === chatInfo[0] &&
          'bg-veryDarkZinc hover:bg-darkZinc dark:bg-mediumDarkCyan hover:dark:bg-veryDarkCyan'
        } ${
          chatUID !== chatInfo[0] &&
          'hover:bg-mediumZinc hover:dark:bg-veryDarkZinc'
        } `}
        to={`/${chatInfo[0]}`}
        state={{ from: location }}
      >
        <BlurImage loading={loadingImg}>
          <AvatarProfile
            photoURL={userInfo?.photoURL}
            displayName={userInfo?.displayName}
            size="50"
          />
        </BlurImage>

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
