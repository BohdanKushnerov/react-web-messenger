import { FC } from 'react';

import ChatListItem from '@components/Sidebar/ChatListItem/ChatListItem';
import useMyUserChatList from '@hooks/useMyUserChatList';
import { ChatListItemType } from 'types/ChatListItemType';

const ChatList: FC = () => {
  const myUserChatList = useMyUserChatList(); // загрузка списка моих чатов

  console.log('screen --> ChatList');

  return (
    <div>
      <ul className="h-full p-0 m-0">
        {myUserChatList &&
          myUserChatList.map((chatInfo: ChatListItemType) => (
            <ChatListItem key={chatInfo[0]} chatInfo={chatInfo} />
          ))}
      </ul>
    </div>
  );
};

export default ChatList;
