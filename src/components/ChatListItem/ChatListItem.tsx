import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';

import { db } from '@myfirebase/config';
import { TChatListItem } from 'types/TChatListItem';
import useChatStore from '@zustand/store';
import { TScreen } from '@pages/Home/Home';
import handleSelectChat from '@utils/handleSelectChat';
import Avatar from 'react-avatar';

interface IChatListItem {
  chat: TChatListItem;
  setScreen?: (value: TScreen) => void;
}

const ChatListItem = ({ chat, setScreen }: IChatListItem) => {
  // const [chatItem, setChatItem] = useState<TChatListItem | null>(null);
  const [isOnline, setIsOnline] = useState(false);
  const location = useLocation();

  const { chatUID } = useChatStore(state => state.currentChatInfo);
  const updateCurrentChatInfo = useChatStore(
    state => state.updateCurrentChatInfo
  );

  console.log(isOnline);

  // useEffect(() => {
  //   if(chat) {
  //     setChatItem(chat);
  //   }
  // }, [chat])

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'users', chat[1].userInfo.uid), doc => {
      const data = doc.data();
      console.log(data);
      setIsOnline(data?.isOnline)
    });

    return () => {
      unsub();
    };
  }, [chat]);

  return (
    <li
      // key={chat[0]}
      className="border border-inputChar p-2"
      onClick={() => handleSelectChat(chat, updateCurrentChatInfo, setScreen)}
    >
      <Link
        className={`flex items-center content-center gap-3 h-72px p-1 rounded-md ${
          chatUID === chat[0] && 'bg-orange-900'
        } ${chatUID !== chat[0] && 'hover:bg-hoverGray'} `}
        to={chat[0]}
        state={{ from: location }}
      >
        {/* <img
                    width={50}
                    height={50}
                    src={chat[1].userInfo.photoURL}
                    alt={chat[1].userInfo.displayName}
                  /> */}
        <Avatar
          className="rounded-full"
          name={`${chat[1].userInfo.displayName}`}
          size="50"
        />
        <div>
          <p className="font-bold text-white">{chat[1].userInfo.displayName}</p>
          <p
            className={`${
              chatUID === chat[0] ? 'text-white' : 'text-textSecondary'
            }`}
          >
            {chat[1].lastMessage}
          </p>
        </div>
        <div>{isOnline ? 'Online': "Offline"}</div>
      </Link>
    </li>
  );
};

export default ChatListItem;