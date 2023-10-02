import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { onDisconnect, ref, set } from 'firebase/database';

import Chat from '@components/Chat/Chat';
import Sidebar from '@components/Sidebar/Sidebar';
import { database, db } from '@myfirebase/config';
import handleSelectChat from '@utils/handleSelectChat';
import useChatStore from '@zustand/store';
import { TChatListItem } from 'types/TChatListItem';
import { TCurrentChatInfo } from 'types/TCurrentChatInfo';
import { TScreen } from 'types/TScreen';

function Home() {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [screen, setScreen] = useState<TScreen>('Sidebar');
  const navigate = useNavigate();

  const currentUserUID = useChatStore(state => state.currentUser.uid);

  const updateCurrentChatInfo = useChatStore(
    state => state.updateCurrentChatInfo
  );

  // isRedirectToCurrentChat
  useEffect(() => {
    async function isRedirectToCurrentChat(
      currentUserUID: string | null,
      handleSelectChat: (
        chat: TChatListItem,
        updateCurrentChatInfo: (chat: TChatListItem) => void,
        setScreen?: ((value: TScreen) => void) | undefined
      ) => void,
      updateCurrentChatInfo: (chat: TCurrentChatInfo) => void,
      setScreen: React.Dispatch<React.SetStateAction<TScreen>>
    ) {
      const combinedUsersChatUID = localStorage.getItem('currentChatId');

      // console.log('combinedUsersChatUID', combinedUsersChatUID);
      // console.log('currentUserUID', currentUserUID);

      if (combinedUsersChatUID && currentUserUID) {
        const res = await getDoc(doc(db, 'userChats', currentUserUID));

        // console.log('res', res.data());

        const chatItem: TChatListItem = [
          combinedUsersChatUID,
          {
            lastMessage: res.data()?.[combinedUsersChatUID].lastMessage,
            userUID: res.data()?.[combinedUsersChatUID].userUID,
          },
        ];

        // console.log(chatItem);

        handleSelectChat(chatItem, updateCurrentChatInfo, setScreen);
        navigate(combinedUsersChatUID);
      }
    }

    isRedirectToCurrentChat(
      currentUserUID,
      handleSelectChat,
      updateCurrentChatInfo,
      setScreen
    );
  }, [currentUserUID, navigate, updateCurrentChatInfo]);

  // resize window
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setIsMobileScreen(window.innerWidth <= 640);
    };

    window.addEventListener('resize', handleResize);

    setIsMobileScreen(window.innerWidth <= 640);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // update online/offline status in realtime database
  useEffect(() => {
    if (currentUserUID) {
      const dbRef = ref(database, 'status/' + currentUserUID);

      // Устанавливаем онлайн-статус при входе
      set(dbRef, true);

      // Устанавливаем обработчик отключения
      const disconnectRef = onDisconnect(dbRef);

      // Устанавливаем офлайн-статус при отключении
      disconnectRef.set(false);

      return () => {
        // Очищаем обработчик отключения при размонтировании компонента
        disconnectRef.cancel();
        // Устанавливаем офлайн-статус при размонтировании компонента
        set(dbRef, false);
      };
    }
  }, [currentUserUID]);

  return (
    <div
      style={{
        display: 'flex',
        height: `${windowHeight}px`,
        overflow: 'hidden',
      }}
    >
      {isMobileScreen ? (
        screen === 'Sidebar' ? (
          <Sidebar setScreen={setScreen} />
        ) : (
          <Chat setScreen={setScreen} />
        )
      ) : (
        <div
          style={{
            display: 'flex',
            height: `${windowHeight}px`,
            overflow: 'hidden',
          }}
        >
          <Sidebar />
          <Chat />
        </div>
      )}
    </div>
  );
}

export default Home;
