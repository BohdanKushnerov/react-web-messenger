import { FC, memo } from 'react';

import ChatListItem from '@components/Sidebar/ChatListItem/ChatListItem';
import useMyUserChatList from '@hooks/useMyUserChatList';
import { ChatListItemType } from 'types/ChatListItemType';
import BrowserTabTitle from './BrowserTabTitle';
import audio from '@assets/notify.mp3';

const ChatList: FC = memo(() => {
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
      <BrowserTabTitle />
      <audio src={audio} id='notify'></audio>
    </div>
  );
});

export default ChatList;
