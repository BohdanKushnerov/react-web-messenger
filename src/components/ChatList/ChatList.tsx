import React from 'react';

import ChatListItem from '@components/ChatListItem/ChatListItem';
import useMyUserChatList from '@hooks/useMyUserChatList';
import { IChatListProps } from '@interfaces/IChatListProps';
import { TChatListItem } from 'types/TChatListItem';

const ChatList = React.memo(({ setScreen }: IChatListProps) => {
  const myUserChatList = useMyUserChatList(); // загрузка списка моих чатов

  return (
    <div>
      <ul className="p-0 m-0">
        {myUserChatList &&
          myUserChatList.map((chatInfo: TChatListItem) => (
            <ChatListItem
              key={chatInfo[0]}
              chatInfo={chatInfo}
              setScreen={setScreen}
            />
          ))}
      </ul>
    </div>
  );
});

export default ChatList;
