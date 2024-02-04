import { FC, Suspense, lazy, memo, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { Transition } from 'react-transition-group';

import ChatList from '@components/Sidebar/ChatList/ChatList';
import Navbar from '@components/Sidebar/Navbar/Navbar';
import SearchUsers from '@components/Sidebar/SearchUsers/SearchUsers';
import SearchChatList from '@components/Sidebar/SearchChatList/SearchChatList';
const ProfileSettings = lazy(
  () => import('@components/Sidebar/ProfileSettings/ProfileSettings')
);
import useChatStore from '@zustand/store';

const Sidebar: FC = memo(() => {
  const nodeRefSidebarDefault = useRef(null);

  const sidebarScreen = useChatStore(state => state.sidebarScreen);

  console.log('screen --> Sidebar');

  return (
    <div className="relative w-full h-full bg-gray-200 dark:bg-myBlackBcg sm:min-w-400px sm:w-1/4 border-r border-r-zinc-800">
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
            <Scrollbars
              autoHide
              style={{
                width: '100%',
                height: 'calc(100% - 48px)',
              }}
            >
              <SearchChatList />
              <ChatList />
            </Scrollbars>
          </div>
        )}
      </Transition>

      {sidebarScreen === 'profileSettings' && (
        <Suspense>
          <ProfileSettings />
        </Suspense>
      )}
    </div>
  );
});

export default Sidebar;
