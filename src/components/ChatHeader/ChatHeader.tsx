import { useEffect, useState } from 'react';
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';
import { onValue, ref } from 'firebase/database';

import AvatarProfile from '@components/AvatarProfile/AvatarProfile';
import { database, db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import { IChatHeaderProps } from '@interfaces/IChatHeaderProps';
import sprite from '@assets/sprite.svg';

const ChatHeader = ({
  setScreen,
  handleClickBackToSidebarScreen,
  setIsShowSearchMessages,
}: IChatHeaderProps) => {
  const [currentChatInfo, setCurrentChatInfo] = useState<DocumentData | null>(
    null
  );
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [isOpponentTyping, setIsOpponentTyping] = useState(false);

  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const { chatUID, userUID } = useChatStore(state => state.currentChatInfo);

  // console.log('screen --> ChatHeader');

  // обновляет инфо о текущем юзере при монтировании нового чата
  useEffect(() => {
    if (!userUID) return;
    const unsubCurrentChatData = onSnapshot(doc(db, 'users', userUID), doc => {
      const data = doc.data();
      if (data) {
        setCurrentChatInfo(data);
      }
    });

    return () => {
      unsubCurrentChatData();
    };
  }, [userUID]);

  // следим за состоянием онлайн/офлайн
  useEffect(() => {
    if (!userUID) return;
    const dbRef = ref(database, 'status/' + userUID);

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
  }, [userUID]);

  // тут слушатель на изменения печатает/не печатает
  useEffect(() => {
    if (!chatUID || !userUID) {
      return;
    }

    const chatDocRef = doc(db, 'chats', chatUID);

    const unsubOponentTypingStatus = onSnapshot(
      chatDocRef,
      docSnapshot => {
        if (docSnapshot.exists()) {
          const chatData = docSnapshot.data();

          // тут проверка, потому что когда создал чат ты первый то у тебя еще нету его обьекта,
          // он появиться когда он начнет перчатать
          if (
            chatData[userUID]?.isTyping === false ||
            chatData[userUID]?.isTyping === true
          ) {
            setIsOpponentTyping(chatData[userUID].isTyping);
          }
        }
      },
      error => {
        console.error('error listener of isTyping:', error);
      }
    );

    return () => {
      unsubOponentTypingStatus();
    };
  }, [chatUID, currentUserUID, userUID]);

  const handleClickShowSearchMessages = () => {
    setIsShowSearchMessages(true);
  };

  return (
    <div className="absolute top-0 left-0 z-10 flex gap-4 items-center w-full h-14 px-6 bg-gray-200 dark:bg-myBlackBcg shadow-bottomShadow">
      {setScreen && (
        <button
          className="flex justify-center items-center w-12 h-12 hover:bg-hoverGray rounded-full cursor-pointer"
          onClick={handleClickBackToSidebarScreen}
        >
          <svg
            className="fill-zinc-600 dark:fill-zinc-400 rotate-180"
            width={24}
            height={24}
          >
            <use href={sprite + '#icon-right-arrow'} />
          </svg>
        </button>
      )}
      <AvatarProfile
        photoURL={currentChatInfo?.photoURL}
        displayName={currentChatInfo?.displayName}
        size="40"
      />
      <p className="font-bold text-zinc-800 dark:text-textSecondary">
        {currentChatInfo?.displayName}
      </p>

      {isOpponentTyping ? (
        <h2 className="text-black dark:text-white">typing...</h2>
      ) : (
        <div className={`${isOnline ? 'text-green-600' : 'text-red-700'}`}>
          {isOnline ? 'Online' : 'Offline'}
        </div>
      )}

      <button className="ml-auto" onClick={handleClickShowSearchMessages}>
        <svg
          className="fill-zinc-600 dark:fill-zinc-400"
          width={24}
          height={24}
        >
          <use href={sprite + '#icon-search'} />
        </svg>
      </button>
    </div>
  );
};

export default ChatHeader;
