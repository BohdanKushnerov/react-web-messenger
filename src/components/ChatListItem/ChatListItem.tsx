import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';
import Avatar from 'react-avatar';

import { database, db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import truncateLastMessageString from '@utils/truncateLastMessageString';
import handleSelectChat from '@utils/handleSelectChat';
import { TChatListItem } from 'types/TChatListItem';
import { onValue, ref } from 'firebase/database';
import { TScreen } from 'types/TScreen';

interface IChatListItem {
  chatInfo: TChatListItem;
  setScreen?: (value: TScreen) => void;
}

const ChatListItem = ({ chatInfo, setScreen }: IChatListItem) => {
  const [userInfo, setUserInfo] = useState<DocumentData | null>(null);
  // const [isOnline, setIsOnline] = useState(false);
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const location = useLocation();

  const { chatUID } = useChatStore(state => state.currentChatInfo);
  const updateCurrentChatInfo = useChatStore(
    state => state.updateCurrentChatInfo
  );
  // console.log(chatInfo);

  useEffect(() => {
    const unsubUserInfoData = onSnapshot(
      doc(db, 'users', chatInfo[1].userUID),
      doc => {
        const data = doc.data();
        if (data) {
          // console.log(data);
          setUserInfo(data);
        }
      }
    );

    const dbRef = ref(database, 'status/' + chatInfo[1].userUID);

    // Устанавливаем слушатель для данных
    const unsubOnlineStatus = onValue(dbRef, snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setIsOnline(data); // Здесь data будет true, если пользователь онлайн, и false, если офлайн
      } else {
        setIsOnline(false); // Если данных нет, считаем пользователя офлайн
      }
    });

    return () => {
      unsubUserInfoData();
      unsubOnlineStatus();
    };
  }, [chatInfo]);

  const handleManageSelectChat = () => {
    handleSelectChat(chatInfo, updateCurrentChatInfo);

    if (setScreen) {
      setScreen('Chat');
    }
  };

  return (
    <li
      className="border border-inputChar p-2"
      onClick={handleManageSelectChat}
    >
      <Link
        className={`flex items-center content-center gap-3 h-72px p-1 rounded-md ${
          chatUID === chatInfo[0] && 'bg-orange-900'
        } ${chatUID !== chatInfo[0] && 'hover:bg-hoverGray'} `}
        to={chatInfo[0]}
        state={{ from: location }}
      >
        {userInfo?.photoURL ? (
          <img
            className="rounded-full"
            width={50}
            height={50}
            src={userInfo?.photoURL}
            alt={userInfo?.displayName}
          />
        ) : (
          <Avatar
            className="rounded-full"
            name={`${userInfo?.displayName}`}
            size="50"
          />
        )}
        <div className="w-full">
          <p className="font-bold text-white">{userInfo?.displayName}</p>
          <p
            className={`${
              chatUID === chatInfo[0] ? 'text-white' : 'text-textSecondary'
            }`}
          >
            {truncateLastMessageString(chatInfo[1].lastMessage, 25)}
          </p>
        </div>
        <div className={`${isOnline ? 'text-green-600' : 'text-red-700'}`}>
          {isOnline ? 'Online' : 'Offline'}
        </div>
      </Link>
    </li>
  );
};

export default ChatListItem;
