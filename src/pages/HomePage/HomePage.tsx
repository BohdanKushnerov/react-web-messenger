import { useRef, memo, Suspense, lazy } from 'react';
import { Transition } from 'react-transition-group';
import { useLocation } from 'react-router-dom';

import Chat from '@components/Chat/Chat';
import Sidebar from '@components/Sidebar/Sidebar';
const BrowserTabTitle = lazy(
  () => import('@components/Sidebar/ChatList/BrowserTabTitle')
);
import useRequestPermission from '@hooks/useRequestPermission';
import useIsRedirectToCurrentChat from '@hooks/useIsRedirectToCurrentChat';
import useResizeWindow from '@hooks/useResizeWindow';
import useIsOnlineMyStatus from '@hooks/useIsOnlineMyStatus';
import audio from '@assets/notify.mp3';
import useBrowserTabVisibilityChange from '@hooks/useBrowserTabVisibilityChange';

const HomePage = memo(() => {
  const { pathname } = useLocation();
  const nodeRefSidebar = useRef(null);
  const nodeRefChat = useRef(null);

  const isFullScreen = useResizeWindow();
  const docHidden = useBrowserTabVisibilityChange();
  useRequestPermission();
  useIsRedirectToCurrentChat(); // useNavigate; currentUserUID, updateCurrentChatInfo - zustand
  useIsOnlineMyStatus(); // currentUserUID - zustand;

  console.log('screen --> HomePage');

  return (
    <div
      className={`flex overflow-hidden bg-main-bcg2 bg-no-repeat bg-cover bg-center`}
      style={{
        height: `${window.innerHeight}px`,
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
          }}
        >
          <Sidebar />
          <Chat />
        </div>
      )}
      {docHidden && (
        <Suspense>
          <BrowserTabTitle docHidden={docHidden} />
        </Suspense>
      )}
      <audio src={audio} id="notify"></audio>
    </div>
  );
});

export default HomePage;
