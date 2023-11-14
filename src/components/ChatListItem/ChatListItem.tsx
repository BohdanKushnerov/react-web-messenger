import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  DocumentData,
  collection,
  doc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { onValue, ref } from 'firebase/database';

import AvatarProfile from '@components/AvatarProfile/AvatarProfile';
import { database, db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import truncateLastMessageString from '@utils/truncateLastMessageString';
import handleSelectChat from '@utils/handleSelectChat';
import { IChatListItemProps } from '@interfaces/IChatListItemProps';
import sprite from '@assets/sprite.svg';

const ChatListItem = ({ chatInfo, setScreen }: IChatListItemProps) => {
  const [userInfo, setUserInfo] = useState<DocumentData | null>(null);
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [lengthOfMyUnreadMsgs, setLengthOfMyUnreadMsgs] = useState<number>(0);
  const [isReadMyLastMessage, setIsReadMyLastMessage] = useState(true);
  const location = useLocation();

  const { uid } = useChatStore(state => state.currentUser);

  const { chatUID } = useChatStore(state => state.currentChatInfo);
  const updateCurrentChatInfo = useChatStore(
    state => state.updateCurrentChatInfo
  );

  // обновляет инфо о текущем юзере в списке чата
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

    return () => {
      unsubUserInfoData();
    };
  }, [chatInfo]);

  // следим за состоянием онлайн/офлайн
  useEffect(() => {
    const dbRef = ref(database, 'status/' + chatInfo[1].userUID);

    // Устанавливаем слушатель для данных
    const unsubOnlineStatus = onValue(dbRef, snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setIsOnline(data);
      } else {
        setIsOnline(false);
      }
    });

    return () => {
      unsubOnlineStatus();
    };
  }, [chatInfo]);

  // следим за количеством непрочитаных сообщений в ChatItem
  useEffect(() => {
    const q = query(
      collection(db, `chats/${chatInfo[0]}/messages`),
      where('isRead', '==', false),
      where('senderUserID', '!=', uid)
    );

    const unsubMyUnreadMsgs = onSnapshot(q, querySnapshot => {
      if (querySnapshot.docs) {
        setLengthOfMyUnreadMsgs(querySnapshot.docs.length);
      }
    });

    return () => {
      unsubMyUnreadMsgs();
    };
  }, [chatInfo, uid]);

  useEffect(() => {
    if (!chatInfo[0] || !uid) return;

    const q = query(
      collection(db, `chats/${chatInfo[0]}/messages`),
      where('isRead', '==', false),
      where('senderUserID', '==', uid)
    );

    const unSub = onSnapshot(q, querySnapshot => {
      if (querySnapshot.docs.length > 0) {
        // setLengthOfUnReadMsgs(querySnapshot.docs.length);
        setIsReadMyLastMessage(false);
      } else {
        setIsReadMyLastMessage(true);
      }
    });

    return () => {
      unSub();
    };
  }, [chatInfo, uid]);

  const handleManageSelectChat = () => {
    handleSelectChat(chatInfo, updateCurrentChatInfo);

    if (setScreen) {
      setScreen('Chat');
    }
  };

  return (
    <li
      className="block w-full border border-inputChar border-l-transparent border-r-transparent p-2"
      onClick={handleManageSelectChat}
    >
      <Link
        className={`flex items-center content-center gap-3 h-72px p-1 rounded-md ${
          chatUID === chatInfo[0] && 'bg-zinc-700 dark:bg-orange-900'
        } ${
          chatUID !== chatInfo[0] && 'hover:bg-zinc-400 hover:dark:bg-zinc-800'
        } `}
        to={chatInfo[0]}
        state={{ from: location }}
      >
        <AvatarProfile
          photoURL={userInfo?.photoURL}
          displayName={userInfo?.displayName}
          size="50"
        />
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
                : 'text-zinc-600 dark:text-textSecondary'
            }`}
          >
            {truncateLastMessageString(chatInfo[1].lastMessage, 25)}
          </p>
        </div>

        {lengthOfMyUnreadMsgs > 0 && (
          <p className="flex justify-center items-center p-1 px-3 border border-white text-white rounded-full shadow-mainShadow bg-gray-500">
            {lengthOfMyUnreadMsgs}
          </p>
        )}

        {chatInfo[1].senderUserID === uid &&
          (isReadMyLastMessage ? (
            <svg
              width={48}
              height={48}
              className={`${
                chatUID === chatInfo[0]
                  ? 'fill-white'
                  : 'fill-zinc-800 dark:fill-white'
              }`}
            >
              <use
                href={sprite + '#icon-double-check'}
                className="shadow-avatarShadow"
              />
            </svg>
          ) : (
            <svg
              width={48}
              height={48}
              className={`${
                chatUID === chatInfo[0]
                  ? 'fill-white'
                  : 'fill-zinc-800 dark:fill-white'
              } drop-shadow-2xl`}
            >
              <use
                href={sprite + '#icon-single-check'}
                className="drop-shadow-2xl"
              />
            </svg>
          ))}

        <div className={`${isOnline ? 'text-green-600' : 'text-red-700'}`}>
          {isOnline ? 'Online' : 'Offline'}
        </div>
      </Link>
    </li>
  );
};

export default ChatListItem;
