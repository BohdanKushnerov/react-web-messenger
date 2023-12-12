import { FC } from 'react';

import ChatListItem from '@components/ChatListItem/ChatListItem';
import useMyUserChatList from '@hooks/useMyUserChatList';
import { IChatListProps } from '@interfaces/IChatListProps';
import { ChatListItemType } from 'types/ChatListItemType';

const ChatList: FC<IChatListProps> = ({ setScreen }) => {
  const myUserChatList = useMyUserChatList(); // загрузка списка моих чатов

  console.log('screen --> ChatList');
  // console.log("myUserChatList", myUserChatList);

  return (
    <div>
      <ul className="p-0 m-0">
        {myUserChatList &&
          myUserChatList.map((chatInfo: ChatListItemType) => (
            <ChatListItem
              key={chatInfo[0]}
              chatInfo={chatInfo}
              setScreen={setScreen}
            />
          ))}
      </ul>
    </div>
  );
};

export default ChatList;
