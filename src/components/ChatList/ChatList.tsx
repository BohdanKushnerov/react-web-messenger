import { FC, useState } from 'react';

import ChatListItem from '@components/ChatListItem/ChatListItem';
import useMyUserChatList from '@hooks/useMyUserChatList';
import useCountChatUnreadMessages from '@hooks/useCountChatUnreadMessages';
import useBrowserTabTitleVisibilityChange from '@hooks/useBrowserTabTitleVisibilityChange';
import { IUnreadMessages } from '@interfaces/IUnreadMessages';
import { ChatListItemType } from 'types/ChatListItemType';

const ChatList: FC = () => {
  const [chatUnreadMessages, setChatUnreadMessages] = useState<IUnreadMessages>(
    {}
  );

  const myUserChatList = useMyUserChatList(); // загрузка списка моих чатов

  const countChatUnreadMessages =
    useCountChatUnreadMessages(chatUnreadMessages); // дает количество непрочитаных сообщений вцелом
  useBrowserTabTitleVisibilityChange(countChatUnreadMessages); // смена тайтла вкладки когда вкладка неактивная и есть непрочитанные сообщения

  // console.log('screen --> ChatList');

  return (
    <div>
      <ul className="h-full p-0 m-0">
        {myUserChatList &&
          myUserChatList.map((chatInfo: ChatListItemType) => (
            <ChatListItem
              key={chatInfo[0]}
              chatInfo={chatInfo}
              setChatUnreadMessages={setChatUnreadMessages}
            />
          ))}
      </ul>
    </div>
  );
};

export default ChatList;
