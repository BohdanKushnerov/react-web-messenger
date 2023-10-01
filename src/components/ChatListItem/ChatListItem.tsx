import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';
import Avatar from 'react-avatar';

import { database, db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import handleSelectChat from '@utils/handleSelectChat';
import { TScreen } from '@pages/Home/Home';
import { TChatListItem } from 'types/TChatListItem';
import { onValue, ref } from 'firebase/database';

// function truncateString(inputString: string, maxLength: number) {
//   if (inputString.length <= maxLength) {
//     return inputString;
//   } else {
//     return inputString.substring(0, maxLength) + '...';
//   }
// }

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
    const unsub = onSnapshot(doc(db, 'users', chatInfo[1].userUID), doc => {
      const data = doc.data();
      if (data) {
        // console.log(data);
        setUserInfo(data);
      }
      // setIsOnline(data?.isOnline);
    });

    const dbRef = ref(database, 'status/' + chatInfo[1].userUID);

    // Устанавливаем слушатель для данных
    const unsubscribe = onValue(dbRef, snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setIsOnline(data); // Здесь data будет true, если пользователь онлайн, и false, если офлайн
      } else {
        setIsOnline(false); // Если данных нет, считаем пользователя офлайн
      }
    });

    return () => {
      unsub();
      unsubscribe();
    };
  }, [chatInfo]);

  return (
    <li
      className="border border-inputChar p-2"
      onClick={() =>
        handleSelectChat(chatInfo, updateCurrentChatInfo, setScreen)
      }
    >
      <Link
        className={`flex items-center content-center gap-3 h-72px p-1 rounded-md ${
          chatUID === chatInfo[0] && 'bg-orange-900'
        } ${chatUID !== chatInfo[0] && 'hover:bg-hoverGray'} `}
        to={chatInfo[0]}
        state={{ from: location }}
      >
        {/* <img
              width={50}
              height={50}
              src={chat[1].userInfo.photoURL}
              alt={chat[1].userInfo.displayName}
            /> */}
        {userInfo?.displayName && (
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
            {/* {truncateString(chatInfo[1].lastMessage, 25)} */}
            {chatInfo[1].lastMessage}
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
