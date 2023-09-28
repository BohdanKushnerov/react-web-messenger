import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';

import Chat from '@components/Chat/Chat';
import Sidebar from '@components/Sidebar/Sidebar';
import { db } from '@myfirebase/config';
import handleSelectChat from '@utils/handleSelectChat';
import useChatStore from '@zustand/store';
import { TChatListItem } from 'types/TChatListItem';
import { TCurrentChatInfo } from 'types/TCurrentChatInfo';

export type TScreen = 'Sidebar' | 'Chat';

function Home() {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [screen, setScreen] = useState<TScreen>('Sidebar');
  const navigate = useNavigate();

  const currentUserUID = useChatStore(state => state.currentUser.uid);

  const updateCurrentChatInfo = useChatStore(
    state => state.updateCurrentChatInfo
  );

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

    if (combinedUsersChatUID && currentUserUID) {
      const res = await getDoc(doc(db, 'userChats', currentUserUID));

      const chatItem: TChatListItem = [
        combinedUsersChatUID,
        {
          lastMessage: res.data()?.[combinedUsersChatUID].lastMessage,
          userInfo: res.data()?.[combinedUsersChatUID].userInfo,
        },
      ];

      console.log(chatItem);

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

  // useEffect(() => {
  //   // делаем селект чат чтобы он открылся сразу при перезагрузке страницы
  //   if (combinedUsersChatID) {
  //     async function qwe() {
  //       const res = await getDoc(doc(db, 'userChats', currentUserUID));

  //       const chatItem: TChatListItem = [
  //         combinedUsersChatID,
  //         {
  //           lastMessage: res.data()?.[combinedUsersChatID].lastMessage,
  //           userInfo: res.data()?.[combinedUsersChatID].userInfo,
  //         },
  //       ];
  //       handleSelectChat(chatItem, updateCurrentChatInfo, setScreen);
  //     }

  //     qwe();
  //   }
  // }, []);

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