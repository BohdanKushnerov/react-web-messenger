import { FC } from 'react';

import IsOnlineUser from '../IsOnlineUser/IsOnlineUser';
import QuantityUnreadMsgs from '../QuantityUnreadMsgs/QuantityUnreadMsgs';
import ReadStatus from '../ReadStatus/ReadStatus';

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
          {lastMsg && truncateLastMessageString(lastMsg, 10)}
        </p>
        <p
          className={`hidden md:block ${
            currentChatUID === itemChatUID
              ? 'text-white'
              : 'text-darkZinc dark:text-veryLightZinc'
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
