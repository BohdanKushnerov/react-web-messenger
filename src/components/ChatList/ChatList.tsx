import { useEffect, useState } from 'react';
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';
import { Link, useLocation } from 'react-router-dom';
import Avatar from 'react-avatar';

import { auth, db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import { TChatListItem } from 'types/TChatListItem';
import { TScreen } from '@pages/Home/Home';
import handleSelectChat from '@utils/handleSelectChat';

interface IChatList {
  setScreen?: (value: TScreen) => void;
}

function ChatList({ setScreen }: IChatList) {
  const [userChatList, setUserChatList] = useState<DocumentData | []>([]);
  const location = useLocation();

  const updateCurrentChatInfo = useChatStore(
    state => state.updateCurrentChatInfo
  );
  const { chatUID } = useChatStore(state => state.currentChatInfo);

  // юзефект для загрузки твоих переписок
  useEffect(() => {
    if (!auth?.currentUser?.uid) return;
    // ==========================================
    const unSub = onSnapshot(
      doc(db, 'userChats', auth?.currentUser?.uid),
      doc => {
        const data = doc.data();
        if (data) {
          const entries = Object.entries(data);
          setUserChatList(entries);
        }
      }
    );

    return () => {
      unSub();
    };
  }, []);

  // const handleSelectChat = (chat: TChatListItem) => {
  //   updateCurrentChatInfo(chat);
  //   if (setScreen) setScreen('Chat');
  // };

  return (
    <div>
      {/* тут список твоих чатов */}
      <ul className="bg-myBlackBcg">
        {userChatList &&
          userChatList.map((chat: TChatListItem) => {
            // console.log('chat', chat);
            return (
              <li
                key={chat[0]}
                className="border border-inputChar p-2"
                onClick={() =>
                  handleSelectChat(chat, updateCurrentChatInfo, setScreen)
                }
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
                    <p className="font-bold text-white">
                      {chat[1].userInfo.displayName}
                    </p>
                    <p
                      className={`${
                        chatUID === chat[0]
                          ? 'text-white'
                          : 'text-textSecondary'
                      }`}
                    >
                      {chat[1].lastMessage}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default ChatList;
