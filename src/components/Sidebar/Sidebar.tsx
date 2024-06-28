import type { FC } from 'react';
import { lazy, memo, useRef } from 'react';

import ChatList from '@components/Sidebar/ChatList/ChatList';
import Navbar from '@components/Sidebar/Navbar/Navbar';
import SearchChatList from '@components/Sidebar/SearchChatList/SearchChatList';
import SearchUsers from '@components/Sidebar/SearchUsers/SearchUsers';
import TransitionComponent from '@components/common/TransitionComponent/TransitionComponent';

import useChatStore from '@zustand/store';

const ProfileSettings = lazy(
  () => import('@components/Sidebar/ProfileSettings/ProfileSettings')
);

const Sidebar: FC = memo(() => {
  const nodeRefSidebarDefault = useRef(null);

  const sidebarScreen = useChatStore(state => state.sidebarScreen);

  return (
    <div className="relative h-full w-full border-r border-r-ultraDarkZinc bg-main dark:bg-mainBlack sm:w-300px md:w-400px">
      <TransitionComponent
        className="h-full w-full origin-left"
        nodeRef={nodeRefSidebarDefault}
        exitedBehavior="hidden"
        enteredBehavior="translate-left"
        condition={sidebarScreen === 'default'}
        timeout={200}
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
      </TransitionComponent>

      <ProfileSettings />
    </div>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
