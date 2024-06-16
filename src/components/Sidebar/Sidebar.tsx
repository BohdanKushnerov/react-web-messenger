import { FC, Suspense, lazy, memo, useRef } from 'react';
import { Transition } from 'react-transition-group';

import LoaderUIActions from '@components/LoaderUIActions/LoaderUIActions';
import ChatList from '@components/Sidebar/ChatList/ChatList';
import Navbar from '@components/Sidebar/Navbar/Navbar';
import SearchChatList from '@components/Sidebar/SearchChatList/SearchChatList';
import SearchUsers from '@components/Sidebar/SearchUsers/SearchUsers';

import useChatStore from '@zustand/store';

const ProfileSettings = lazy(
  () => import('@components/Sidebar/ProfileSettings/ProfileSettings')
);

const Sidebar: FC = memo(() => {
  const nodeRefSidebarDefault = useRef(null);

  const sidebarScreen = useChatStore(state => state.sidebarScreen);

  return (
    <div className="relative h-full w-full border-r border-r-ultraDarkZinc bg-main dark:bg-mainBlack sm:w-300px md:w-400px">
      <Transition
        nodeRef={nodeRefSidebarDefault}
        in={sidebarScreen === 'default'}
        timeout={300}
        unmountOnExit
      >
        {state => (
          <div
            ref={nodeRefSidebarDefault}
            className={`h-full w-full origin-top-left transform transition-transform ${state === 'exited' ? 'hidden' : ''} ${
              state === 'entered'
                ? 'translate-x-0 rotate-0'
                : '-translate-x-1/2 rotate-180 duration-300'
            } `}
          >
            <div className="flex gap-2 px-3 py-2">
              <Navbar />
              <SearchUsers />
            </div>

            <div
              style={{
                position: 'relative',
                overflow: 'scroll',
                width: '100%',
                height: 'calc(100% - 48px)',
              }}
            >
              <SearchChatList />
              <ChatList />
            </div>
          </div>
        )}
      </Transition>

      {sidebarScreen === 'profileSettings' && (
        <Suspense
          fallback={
            <div className="absolute left-1/2 -translate-x-1/2">
              <LoaderUIActions size={200} />
            </div>
          }
        >
          <ProfileSettings />
        </Suspense>
      )}
    </div>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
