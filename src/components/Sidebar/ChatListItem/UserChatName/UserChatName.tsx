import { FC } from 'react';
import { DocumentData } from 'firebase/firestore';

import truncateLastMessageString from '@utils/chatListItem/truncateLastMessageString';
import { ChatListItemType } from 'types/ChatListItemType';

interface IUserChatNameProps {
  chatUID: string | null;
  chatInfo: ChatListItemType;
  userInfo: DocumentData | null;
}

const UserChatName: FC<IUserChatNameProps> = ({
  chatUID,
  chatInfo,
  userInfo,
}) => {
  return (
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
  );
};

export default UserChatName;
