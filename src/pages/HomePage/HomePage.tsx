import { useState, useRef, memo } from 'react';
import { Transition } from 'react-transition-group';

import Chat from '@components/Chat/Chat';
import Sidebar from '@components/Sidebar/Sidebar';
import useRequestPermission from '@hooks/useRequestPermission';
import useIsRedirectToCurrentChat from '@hooks/useIsRedirectToCurrentChat';
import useResizeWindow from '@hooks/useResizeWindow';
import { AppScreenType } from 'types/AppScreenType';
import useIsOnlineMyStatus from '@hooks/useIsOnlineMyStatus';
import useAppScreen from '@hooks/useAppScreen';

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
  const nodeRefSidebar = useRef(null);
  const nodeRefChat = useRef(null);

  console.log('screen --> HomePage');
  console.log('screen==========================', screen);

  useRequestPermission();
  useAppScreen(setScreen); // useLocation; + 1 setState
  useIsRedirectToCurrentChat(); // useNavigate; currentUserUID, updateCurrentChatInfo - zustand
  useResizeWindow(setScreen, setWindowHeight); // useLocation; + 2 setState
  useIsOnlineMyStatus(); // currentUserUID - zustand;

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
