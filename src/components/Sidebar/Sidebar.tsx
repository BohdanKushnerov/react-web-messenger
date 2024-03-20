import { FC, Suspense, lazy, useRef } from 'react';
import { Transition } from 'react-transition-group';

import ChatList from '@components/Sidebar/ChatList/ChatList';
import Navbar from '@components/Sidebar/Navbar/Navbar';
import SearchUsers from '@components/Sidebar/SearchUsers/SearchUsers';
import SearchChatList from '@components/Sidebar/SearchChatList/SearchChatList';
const ProfileSettings = lazy(
  () => import('@components/Sidebar/ProfileSettings/ProfileSettings')
);
import useChatStore from '@zustand/store';
import LoaderUIActions from '@components/LoaderUIActions/LoaderUIActions';

const Sidebar: FC = () => {
  const nodeRefSidebarDefault = useRef(null);

  const sidebarScreen = useChatStore(state => state.sidebarScreen);

  console.log('screen --> Sidebar');

  return (
    <div className="relative w-full h-full bg-gray-200 dark:bg-myBlackBcg sm:min-w-[400px] sm:w-1/4 border-r border-r-zinc-800">
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
};

export default Sidebar;
