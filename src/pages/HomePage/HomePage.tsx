import { useRef, memo, Suspense, lazy } from 'react';
import { Transition } from 'react-transition-group';
import { Outlet, useLocation } from 'react-router-dom';

import Sidebar from '@components/Sidebar/Sidebar';
import Chat from '@pages/Chat/Chat';
const BrowserTabTitle = lazy(
  () => import('@components/BrowserTabTitle/BrowserTabTitle')
);
import useRequestPermission from '@hooks/useRequestPermission';
import useIsRedirectToCurrentChat from '@hooks/useIsRedirectToCurrentChat';
import useResizeWindow from '@hooks/useResizeWindow';
import useIsOnlineMyStatus from '@hooks/useIsOnlineMyStatus';
import useBrowserTabVisibilityChange from '@hooks/useBrowserTabVisibilityChange';
import audio from '@assets/notify.mp3';

const HomePage = memo(() => {
  const { pathname } = useLocation();
  const nodeRefSidebar = useRef(null);
  const nodeRefChat = useRef(null);

  const { isFullScreen, heightWindow } = useResizeWindow();
  const docHidden = useBrowserTabVisibilityChange();
  useRequestPermission();
  useIsRedirectToCurrentChat(); // useNavigate; currentUserUID, updateCurrentChatInfo - zustand
  useIsOnlineMyStatus(); // currentUserUID - zustand;

  console.log('screen --> HomePage');

  return (
    <div
      className={`flex overflow-hidden bg-main-bcg2 bg-no-repeat bg-cover bg-center`}
      style={{
        height: `${heightWindow}px`,
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
              <Outlet />
            </div>
          )}
        </Transition>
      </div>
      {isFullScreen && (
        <div
          className="hidden sm:flex overflow-hidden"
          style={{
            height: `${heightWindow}px`,
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
