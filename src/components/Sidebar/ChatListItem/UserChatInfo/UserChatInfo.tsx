import type { FC } from 'react';

import type { DocumentData } from 'firebase/firestore';

import IsOnlineUser from '../IsOnlineUser/IsOnlineUser';
import QuantityUnreadMessages from '../QuantityUnreadMessages/QuantityUnreadMessages';
import ReadStatus from '../ReadStatus/ReadStatus';

import useGetLastMessage from '@hooks/sidebar/useGetLastMessage';

import truncateLastMessageString from '@utils/chatListItem/truncateLastMessageString';

import type { ChatListItemType } from 'types/ChatListItemType';

interface IUserChatInfoProps {
  currentChatUID: string | null;
  chatInfo: ChatListItemType;
  userInfo: DocumentData | null;
}

const UserChatInfo: FC<IUserChatInfoProps> = ({
  currentChatUID,
  chatInfo,
  userInfo,
}) => {
  const itemChatUID = chatInfo[0];
  const lastMessage = useGetLastMessage(itemChatUID);

  const lastMessageSenderUID = lastMessage?.senderUserID;
  const oponentUserUID = chatInfo[1].userUID;

  return (
    <>
      <div className="w-full">
        <p
          className={`font-bold ${
            currentChatUID === itemChatUID
              ? 'text-white'
              : 'text-ultraDarkZinc dark:text-white'
          }`}
        >
          {userInfo?.displayName}
        </p>
        <p
          className={`w-full sm:w-100px md:hidden ${
            currentChatUID === itemChatUID
              ? 'text-white'
              : 'text-darkZinc dark:text-veryLightZinc'
          }`}
        >
          {lastMessage && truncateLastMessageString(lastMessage, 10)}
        </p>
        <p
          className={`hidden md:block ${
            currentChatUID === itemChatUID
              ? 'text-white'
              : 'text-darkZinc dark:text-veryLightZinc'
          }`}
        >
          {lastMessage && truncateLastMessageString(lastMessage, 25)}
        </p>
      </div>

      {itemChatUID && <QuantityUnreadMessages chatUID={itemChatUID} />}

      {lastMessageSenderUID && (
        <ReadStatus
          itemChatUID={itemChatUID}
          senderUserID={lastMessageSenderUID}
        />
      )}

      <IsOnlineUser userUID={oponentUserUID} />
    </>
  );
};

export default UserChatInfo;
