import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import AvatarProfile from '@components/AvatarProfile/AvatarProfile';
import useChatStore from '@zustand/store';
import useChatInfo from '@hooks/useChatInfo';
import useIsOnlineStatus from '@hooks/useIsOnlineStatus';
import useLengthOfMyUnreadMsgs from '@hooks/useLengthOfMyUnreadMsgs';
import useIsReadMyLastMessage from '@hooks/useIsReadMyLastMessage';
import useUnreadMessagesInChatListItem from '@hooks/useUnreadMessagesInChatListItem';
import truncateLastMessageString from '@utils/truncateLastMessageString';
import handleSelectChat from '@utils/handleSelectChat';
import { IChatListItemProps } from '@interfaces/IChatListItemProps';
import sprite from '@assets/sprite.svg';
import '@i18n';

const ChatListItem: FC<IChatListItemProps> = ({ chatInfo }) => {
  const location = useLocation();
  const { t } = useTranslation();

  const { uid } = useChatStore(state => state.currentUser);
  const { chatUID } = useChatStore(state => state.currentChatInfo);
  const updateCurrentChatInfo = useChatStore(
    state => state.updateCurrentChatInfo
  );

  const isOnline = useIsOnlineStatus(chatInfo[1].userUID); // следим за состоянием онлайн/офлайн
  const userInfo = useChatInfo(chatInfo[1].userUID); // обновляет инфо о текущем юзере в списке чата
  const lengthOfMyUnreadMsgs = useLengthOfMyUnreadMsgs(chatInfo); // следим за количеством моих непрочитаных сообщений в ChatItem
  const isReadMyLastMessage = useIsReadMyLastMessage(chatInfo); // прочитаное мое последнее сообщение или нет
  useUnreadMessagesInChatListItem(lengthOfMyUnreadMsgs, chatInfo);

  const updateTotalUnreadMessages = useChatStore(
    state => state.updateTotalUnreadMessages
  );

  // console.log('screen --> ChatListItem');

  const handleManageSelectChat = () => {
    if (chatInfo[0]) {
      handleSelectChat(chatInfo, updateCurrentChatInfo);
      // при выборе чата с непрочитаными сообщениями сбрасываем на 0
      if (lengthOfMyUnreadMsgs) {
        updateTotalUnreadMessages({ [chatInfo[0]]: 0 });
      }
    }
  };

  return (
    <li
      className="block w-full border border-inputChar border-l-transparent border-r-transparent p-2"
      onClick={handleManageSelectChat}
    >
      <Link
        className={`flex items-center content-center gap-3 h-72px p-1 rounded-md transition-all duration-300 group ${
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
        <div className="w-full">
          <p
            className={`font-bold ${
              chatUID === chatInfo[0]
                ? 'text-white'
                : 'text-zinc-900 dark:text-white'
            }`}
          >
            {userInfo?.displayName}
          </p>
          <p
            className={`${
              chatUID === chatInfo[0]
                ? 'text-white'
                : 'text-zinc-600 dark:text-zinc-100'
            }`}
          >
            {truncateLastMessageString(chatInfo[1].lastMessage, 25)}
          </p>
        </div>

        {lengthOfMyUnreadMsgs > 0 && (
          <p className="flex justify-center items-center p-1 px-3 border border-white text-white rounded-full shadow-mainShadow bg-gray-500">
            {lengthOfMyUnreadMsgs}
          </p>
        )}

        {chatInfo[1].senderUserID === uid &&
          (isReadMyLastMessage ? (
            <svg
              width={48}
              height={48}
              className={`${
                chatUID === chatInfo[0]
                  ? 'fill-white'
                  : 'fill-zinc-800 dark:fill-white'
              }`}
            >
              <use
                href={sprite + '#icon-double-check'}
                className="shadow-avatarShadow"
              />
            </svg>
          ) : (
            <svg
              width={48}
              height={48}
              className={`${
                chatUID === chatInfo[0]
                  ? 'fill-white'
                  : 'fill-zinc-800 dark:fill-white'
              } drop-shadow-2xl`}
            >
              <use
                href={sprite + '#icon-single-check'}
                className="drop-shadow-2xl"
              />
            </svg>
          ))}

        <div className={`${isOnline ? 'text-green-700' : 'text-red-700'}`}>
          {isOnline ? t('Online') : t('Offline')}
        </div>
      </Link>
    </li>
  );
};

export default ChatListItem;
