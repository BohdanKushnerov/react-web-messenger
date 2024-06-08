import { FC } from 'react';

import QuantityUnreadMsgs from '../QuantityUnreadMsgs/QuantityUnreadMsgs';
import ReadStatus from '../ReadStatus/ReadStatus';
import IsOnlineUser from '../IsOnlineUser/IsOnlineUser';
import useGetLastMessage from '@hooks/useGetLastMessage';
import truncateLastMessageString from '@utils/chatListItem/truncateLastMessageString';
import { IUserChatInfoProps } from '@interfaces/IUserChatInfoProps';

const UserChatInfo: FC<IUserChatInfoProps> = ({
  currentChatUID,
  chatInfo,
  userInfo,
}) => {
  const itemChatUID = chatInfo[0];
  const lastMsg = useGetLastMessage(itemChatUID);

  const lastMsgSenderUID = lastMsg?.senderUserID;
  const oponentUserUID = chatInfo[1].userUID;

  return (
    <>
      <div className="w-full">
        <p
          className={`font-bold ${
            currentChatUID === itemChatUID
              ? 'text-white'
              : 'text-zinc-900 dark:text-white'
          }`}
        >
          {userInfo?.displayName}
        </p>
        <p
          className={`w-full sm:w-[100px] md:hidden ${
            currentChatUID === itemChatUID
              ? 'text-white'
              : 'text-zinc-600 dark:text-zinc-100'
          }`}
        >
          {lastMsg && truncateLastMessageString(lastMsg, 10)}
        </p>
        <p
          className={`hidden md:block ${
            currentChatUID === itemChatUID
              ? 'text-white'
              : 'text-zinc-600 dark:text-zinc-100'
          }`}
        >
          {lastMsg && truncateLastMessageString(lastMsg, 25)}
        </p>
      </div>

      {itemChatUID && <QuantityUnreadMsgs chatUID={itemChatUID} />}

      {lastMsgSenderUID && itemChatUID && (
        <ReadStatus itemChatUID={itemChatUID} senderUserID={lastMsgSenderUID} />
      )}

      <IsOnlineUser userUID={oponentUserUID} />
    </>
  );
};

export default UserChatInfo;
