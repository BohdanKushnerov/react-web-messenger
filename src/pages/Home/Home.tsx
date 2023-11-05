import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { onDisconnect, ref, set } from 'firebase/database';
import { Transition } from 'react-transition-group';

import Chat from '@components/Chat/Chat';
import Sidebar from '@components/Sidebar/Sidebar';
import { database, db } from '@myfirebase/config';
import handleSelectChat from '@utils/handleSelectChat';
import useChatStore from '@zustand/store';
import { TChatListItem } from 'types/TChatListItem';
import { TCurrentChatInfo } from 'types/TCurrentChatInfo';
import { TScreen } from 'types/TScreen';

const Home = React.memo(() => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [screen, setScreen] = useState<TScreen>('Sidebar');
  const [showSidebar, setShowSidebar] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const navigate = useNavigate();
  const nodeRefSidebar = useRef(null);
  const nodeRefChat = useRef(null);

  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const updateCurrentChatInfo = useChatStore(
    state => state.updateCurrentChatInfo
  );

  console.log('screen --> Home');

  useEffect(() => {
    if (screen === 'Sidebar') {
      setShowSidebar(true);
      setShowChat(false);
    } else {
      setShowSidebar(false);
      setShowChat(true);
    }
  }, [screen]);

  useEffect(() => {
    const requestPermission = async () => {
      console.log('Requesting permission...');
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          console.log('Notification permission granted.');
        }
      } catch (error) {
        console.error('Failed to request notification permission:', error);
      }
    };

    requestPermission();
  }, []);

  // isRedirectToCurrentChat
  useEffect(() => {
    async function isRedirectToCurrentChat(
      currentUserUID: string | null,
      handleSelectChat: (
        chat: TChatListItem,
        updateCurrentChatInfo: (chat: TChatListItem) => void
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
            senderUserID: res.data()?.[combinedUsersChatUID].senderUserID,
            userUID: res.data()?.[combinedUsersChatUID].userUID,
          },
        ];

        console.log('go ==> redirect')

        handleSelectChat(chatItem, updateCurrentChatInfo);
        setScreen('Chat');
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
      className="bg-main-bcg2 bg-no-repeat bg-cover bg-center"
      style={{
        display: 'flex',
        height: `${windowHeight}px`,
        overflow: 'hidden',
      }}
    >
      {isMobileScreen ? (
        <>
          <Transition
            nodeRef={nodeRefSidebar}
            in={showSidebar}
            timeout={300}
            unmountOnExit
          >
            {state => (
              <div
                ref={nodeRefSidebar}
                className={`w-full ${
                  state === 'exited' ? 'hidden' : ''
                } transform transition-transform ${
                  state === 'entered'
                    ? 'translate-x-0 scale-100'
                    : '-translate-x-full scale-0'
                }`}
              >
                <Sidebar setScreen={setScreen} />
              </div>
            )}
          </Transition>
          <Transition
            nodeRef={nodeRefChat}
            in={showChat}
            timeout={300}
            unmountOnExit
          >
            {state => {
              // console.log('state', state);
              return (
                <div
                  ref={nodeRefChat}
                  className={`w-full transform transition-transform 
                  ${
                    state === 'exited' ? 'hidden' : ''
                  }
                  ${
                    state === 'entered'
                      ? 'translate-x-0 scale-100'
                      : 'translate-x-full scale-0'
                  }`}
                >
                  <Chat setScreen={setScreen} />
                </div>
              );
            }}
          </Transition>
        </>
      ) : (
        <div
          style={{
            display: 'flex',
            height: `${windowHeight}px`,
            overflow: 'hidden',
          }}
        >
          <Sidebar setScreen={setScreen} />
          <Chat />
        </div>
      )}
    </div>
  );
});

export default Home;
