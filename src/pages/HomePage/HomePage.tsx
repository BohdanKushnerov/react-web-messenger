import { useState, useEffect, useRef, memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { onDisconnect, ref, set } from 'firebase/database';
import { Transition } from 'react-transition-group';

import Chat from '@components/Chat/Chat';
import Sidebar from '@components/Sidebar/Sidebar';
import { database, db } from '@myfirebase/config';
import handleSelectChat from '@utils/handleSelectChat';
import useChatStore from '@zustand/store';
import { ChatListItemType } from 'types/ChatListItemType';
import { CurrentChatInfo } from 'types/CurrentChatInfo';
import { AppScreenType } from 'types/AppScreenType';

const HomePage = memo(() => {
  const [windowHeight, setWindowHeight] = useState(() => window.innerHeight);
  const [screen, setScreen] = useState<AppScreenType>(() => {
    if (window.innerWidth <= 640) {
      return window.location.pathname === '/react-web-messenger'
        ? 'Sidebar'
        : 'Chat';
    } else {
      return 'FullScreen';
    }
  });

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const nodeRefSidebar = useRef(null);
  const nodeRefChat = useRef(null);

  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const updateCurrentChatInfo = useChatStore(
    state => state.updateCurrentChatInfo
  );

  console.log('screen --> HomePage');

  useEffect(() => {
    if (window.innerWidth <= 640) {
      if (pathname === '/') {
        setScreen('Sidebar');
      } else {
        setScreen('Chat');
      }
    }
  }, [pathname]);

  // Requesting permission
  useEffect(() => {
    const requestPermission = async () => {
      // console.log('Requesting permission...');
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          // console.log('Notification permission granted.');
        }
      } catch (error) {
        console.error('Failed to request notification permission:', error);
      }
    };

    requestPermission();
  }, []);

  // // isRedirectToCurrentChat
  useEffect(() => {
    async function isRedirectToCurrentChat(
      currentUserUID: string | null,
      handleSelectChat: (
        chat: ChatListItemType,
        updateCurrentChatInfo: (chat: ChatListItemType) => void
      ) => void,
      updateCurrentChatInfo: (chat: CurrentChatInfo) => void
    ) {
      const combinedUsersChatUID = localStorage.getItem('currentChatId');

      if (combinedUsersChatUID && currentUserUID) {
        const res = await getDoc(doc(db, 'userChats', currentUserUID));

        const chatItem: ChatListItemType = [
          combinedUsersChatUID,
          {
            lastMessage: res.data()?.[combinedUsersChatUID].lastMessage,
            senderUserID: res.data()?.[combinedUsersChatUID].senderUserID,
            userUID: res.data()?.[combinedUsersChatUID].userUID,
          },
        ];

        handleSelectChat(chatItem, updateCurrentChatInfo);
        navigate(combinedUsersChatUID);
      }
    }

    isRedirectToCurrentChat(
      currentUserUID,
      handleSelectChat,
      updateCurrentChatInfo
    );
  }, [currentUserUID, navigate, updateCurrentChatInfo]);

  // resize window
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      // setIsMobileScreen(window.innerWidth <= 640);
    };

    window.addEventListener('resize', handleResize);

    // setIsMobileScreen(window.innerWidth <= 640);

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

  // h-[${windowHeight.toString()}px]

  return (
    <div
      className={`flex overflow-hidden bg-main-bcg2 bg-no-repeat bg-cover bg-center`}
      style={{
        height: `${windowHeight}px`,
      }}
    >
      <div className="w-full h-full flex sm:hidden">
        <Transition
          nodeRef={nodeRefSidebar}
          in={screen === 'Sidebar'}
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
              <Sidebar />
            </div>
          )}
        </Transition>
        <Transition
          nodeRef={nodeRefChat}
          in={screen === 'Chat'}
          timeout={300}
          unmountOnExit
        >
          {state => (
            <div
              ref={nodeRefChat}
              className={`w-full transform transition-transform 
                  ${state === 'exited' ? 'hidden' : ''}
                  ${
                    state === 'entered'
                      ? 'translate-x-0 scale-100'
                      : 'translate-x-full scale-0'
                  }`}
            >
              <Chat />
            </div>
          )}
        </Transition>
      </div>
      <div
        className="hidden sm:flex overflow-hidden"
        style={{
          height: `${windowHeight}px`,
        }}
      >
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
});

export default HomePage;
