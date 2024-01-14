import { useState, useRef, memo } from 'react';
import { Transition } from 'react-transition-group';
import { useLocation } from 'react-router-dom';

import Chat from '@components/Chat/Chat';
import Sidebar from '@components/Sidebar/Sidebar';
import useRequestPermission from '@hooks/useRequestPermission';
// import useIsRedirectToCurrentChat from '@hooks/useIsRedirectToCurrentChat';
import useResizeWindow from '@hooks/useResizeWindow';
import useIsOnlineMyStatus from '@hooks/useIsOnlineMyStatus';

const HomePage = memo(() => {
  const [isFullScreen, setIsFullScreen] = useState(
    () => window.innerWidth > 640
  );
  const { pathname } = useLocation();
  const nodeRefSidebar = useRef(null);
  const nodeRefChat = useRef(null);

  useRequestPermission();
  // useAppScreen(setScreen); // useLocation; + 1 setState
  // useIsRedirectToCurrentChat(); // useNavigate; currentUserUID, updateCurrentChatInfo - zustand
  useResizeWindow(setIsFullScreen); // useLocation; + 2 setState
  useIsOnlineMyStatus(); // currentUserUID - zustand;

  console.log('screen --> HomePage');

  return (
    <div
      className={`flex overflow-hidden bg-main-bcg2 bg-no-repeat bg-cover bg-center`}
      style={{
        height: `${window.innerHeight}px`,
        // height: '100vh',
      }}
    >
      <div className="w-full h-full flex sm:hidden">
        <Transition
          nodeRef={nodeRefSidebar}
          in={
            window.innerWidth <= 640
              ? (pathname === '/' ? 'Sidebar' : 'Chat') === 'Sidebar'
              : false
          }
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
          in={
            window.innerWidth <= 640
              ? (pathname === '/' ? 'Sidebar' : 'Chat') === 'Chat'
              : false
          }
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
      {isFullScreen && (
        <div
          className="hidden sm:flex overflow-hidden"
          style={{
            height: `${window.innerHeight}px`,
            // height: '100vh',
          }}
        >
          <Sidebar />
          <Chat />
        </div>
      )}
    </div>
  );
});

export default HomePage;
