import { FC, Suspense, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Transition } from 'react-transition-group';

import Sidebar from '@components/Sidebar/Sidebar';
import useChatStore from '@zustand/store';
// import { AppScreenType } from 'types/AppScreenType';
import { onDisconnect, ref, set } from 'firebase/database';
import { database, db } from '@myfirebase/config';
import { ChatListItemType } from 'types/ChatListItemType';
import { CurrentChatInfo } from 'types/CurrentChatInfo';
// import { AppScreenType } from 'types/AppScreenType';
import { doc, getDoc } from 'firebase/firestore';
import handleSelectChat from '@utils/handleSelectChat';

// const Layout: FC<{ children: ReactNode }> = ({ children }) => {
const Layout: FC = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const nodeRefSidebar = useRef(null);
  const nodeRefChat = useRef(null);

  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const updateCurrentChatInfo = useChatStore(
    state => state.updateCurrentChatInfo
  );

  // requestPermission
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

  // isRedirectToCurrentChat
  useEffect(() => {
    async function isRedirectToCurrentChat(
      currentUserUID: string | null,
      handleSelectChat: (
        chat: ChatListItemType,
        updateCurrentChatInfo: (chat: ChatListItemType) => void
      ) => void,
      updateCurrentChatInfo: (chat: CurrentChatInfo) => void,
      // setScreen: React.Dispatch<React.SetStateAction<AppScreenType>>
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
        // setScreen('Chat');
        navigate(combinedUsersChatUID);
      }
    }

    isRedirectToCurrentChat(
      currentUserUID,
      handleSelectChat,
      updateCurrentChatInfo,
      // setScreen
    );
  }, [currentUserUID, navigate, updateCurrentChatInfo]);

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

  useEffect(() => {
    if (pathname === '/') {
      setShowSidebar(true);
      setShowChat(false);
    } else {
      setShowSidebar(false);
      setShowChat(true);
    }
  }, [pathname]);

  return (
    <div
      className={`bg-main-bcg2 bg-no-repeat bg-cover bg-center`}
      style={{
        display: 'flex',
        height: `${windowHeight}px`,
        overflow: 'hidden',
      }}
    >
      {isMobileScreen ? (
        pathname === '/' ? (
          <Transition
            nodeRef={nodeRefSidebar}
            in={showSidebar}
            timeout={500}
            unmountOnExit
            // mountOnEnter
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
        ) : (
          // <Suspense fallback={<div>Loading...</div>}>
          //   <Outlet />
          // </Suspense>
          <Transition
            nodeRef={nodeRefChat}
            in={showChat}
            timeout={500}
            unmountOnExit
            // mountOnEnter
          >
            {state => (
              <div
                ref={nodeRefChat}
                className={`transform transition-transform 
                  ${state === 'exited' ? 'hidden' : ''}
                  ${
                    state === 'entered'
                      ? 'translate-x-0 scale-100'
                      : 'translate-x-full scale-0'
                  }`}
              >
                <Suspense fallback={<div>Loading...</div>}>
                  <Outlet />
                </Suspense>
              </div>
            )}
          </Transition>
        )
      ) : (
        <>
          <Sidebar />
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </>
      )}
    </div>
  );
};

export default Layout;

{
  /* <Transition
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
            <Sidebar />
          </div>
        )}
      </Transition> */
}

{
  /* <Transition
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
              <Sidebar />
            </div>
          )}
        </Transition> */
}
