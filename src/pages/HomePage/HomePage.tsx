import { Suspense, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import BrowserTabTitle from '@components/BrowserTabTitle/BrowserTabTitle';
import EmptyChat from '@components/EmptyChat/EmptyChat';
import Sidebar from '@components/Sidebar/Sidebar';
import LoaderUIActions from '@components/common/LoaderUIActions/LoaderUIActions';
import TransitionComponent from '@components/common/TransitionComponent/TransitionComponent';

import useBrowserTabVisibilityChange from '@hooks/useBrowserTabVisibilityChange';
import useIsOnlineMyStatus from '@hooks/useIsOnlineMyStatus';
import useIsRedirectToCurrentChat from '@hooks/useIsRedirectToCurrentChat';
import useNotification from '@hooks/useNotification';
import useRequestPermission from '@hooks/useRequestPermission';
import useResizeWindow from '@hooks/useResizeWindow';

import { ElementsId } from '@enums/elementsId';

import audio from '@assets/notify.mp3';

const HomePage = () => {
  const nodeRefSidebar = useRef(null);
  const nodeRefChat = useRef(null);

  const { pathname } = useLocation();

  const { isFullScreen, heightWindow } = useResizeWindow();
  const docHidden = useBrowserTabVisibilityChange();

  useRequestPermission();
  useIsOnlineMyStatus();
  useIsRedirectToCurrentChat();
  useNotification();

  return (
    <main
      className="flex w-full overflow-hidden bg-main-bcg2 bg-cover bg-center bg-no-repeat"
      style={{
        height: `${heightWindow}px`,
        overflow: 'hidden',
      }}
    >
      <TransitionComponent
        className="w-full sm:w-300px md:w-400px"
        nodeRef={nodeRefSidebar}
        exitedBehavior="hidden"
        enteredBehavior="translate-left"
        condition={
          (pathname === '/' ? 'Sidebar' : 'Chat') === 'Sidebar' || isFullScreen
        }
        timeout={300}
      >
        <Sidebar />
      </TransitionComponent>

      <TransitionComponent
        className="relative w-full"
        nodeRef={nodeRefChat}
        exitedBehavior="hidden"
        enteredBehavior="translate-right"
        condition={
          (pathname === '/' ? 'Sidebar' : 'Chat') === 'Chat' || isFullScreen
        }
        timeout={300}
      >
        <EmptyChat isShowNotifyMsg={pathname === '/' && isFullScreen} />
        <Suspense
          fallback={
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <LoaderUIActions size={200} />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </TransitionComponent>

      {docHidden && <BrowserTabTitle docHidden={docHidden} />}

      <audio id={ElementsId.NotifyAudio} src={audio}>
        <track kind="captions" src="" srcLang="en" label="English captions" />
      </audio>
    </main>
  );
};

export default HomePage;
