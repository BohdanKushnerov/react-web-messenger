import { FC, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { Transition } from 'react-transition-group';

import ChatList from '@components/ChatList/ChatList';
import Navbar from '@components/Navbar/Navbar';
import SearchUsers from '@components/SearchUsers/SearchUsers';
import SearchChatList from '@components/SearchChatList/SearchChatList';
import ProfileSettings from '@components/ProfileSettings/ProfileSettings';
import useChatStore from '@zustand/store';

const Sidebar: FC = () => {
  const nodeRefSidebarDefault = useRef(null);
  const nodeRefProfileSettings = useRef(null);
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
        {state => {
          return (
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
          );
        }}
      </Transition>

      <Transition
        nodeRef={nodeRefProfileSettings}
        in={sidebarScreen === 'profileSettings'}
        timeout={300}
        unmountOnExit
      >
        {state => {
          // console.log('state ProfileSettings Transition', state);
          return (
            <div
              ref={nodeRefProfileSettings}
              className={`absolute top-0 left-0 w-full transform origin-top-left transition-transform 
                  ${state === 'exited' ? 'hidden' : ''}
                  ${
                    state === 'entered'
                      ? 'rotate-0 translate-x-0'
                      : 'rotate-180 -translate-x-1/2 duration-300'
                  }
                  `}
            >
              <ProfileSettings />
            </div>
          );
        }}
      </Transition>
    </div>
  );
};

export default Sidebar;
