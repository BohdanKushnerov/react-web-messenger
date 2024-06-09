import { FC, Suspense, lazy, memo, useRef } from 'react';
import { Transition } from 'react-transition-group';

import ChatList from '@components/Sidebar/ChatList/ChatList';
import Navbar from '@components/Sidebar/Navbar/Navbar';
import SearchUsers from '@components/Sidebar/SearchUsers/SearchUsers';
import SearchChatList from '@components/Sidebar/SearchChatList/SearchChatList';
import LoaderUIActions from '@components/LoaderUIActions/LoaderUIActions';
const ProfileSettings = lazy(
  () => import('@components/Sidebar/ProfileSettings/ProfileSettings')
);
import useChatStore from '@zustand/store';

const Sidebar: FC = memo(() => {
  const nodeRefSidebarDefault = useRef(null);

  const sidebarScreen = useChatStore(state => state.sidebarScreen);

  return (
    <div className="relative w-full h-full sm:w-[300px] md:w-[400px] bg-gray-200 dark:bg-myBlackBcg border-r border-r-zinc-800">
      <Transition
        nodeRef={nodeRefSidebarDefault}
        in={sidebarScreen === 'default'}
        timeout={300}
        unmountOnExit
      >
        {state => (
          <div
            ref={nodeRefSidebarDefault}
            className={`w-full h-full transform origin-top-left transition-transform 
                  ${state === 'exited' ? 'hidden' : ''}
                  ${
                    state === 'entered'
                      ? 'rotate-0 translate-x-0'
                      : 'rotate-180 -translate-x-1/2 duration-300'
                  }
                  `}
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
