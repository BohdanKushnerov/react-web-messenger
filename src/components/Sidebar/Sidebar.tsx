import Scrollbars from 'react-custom-scrollbars-2';

import ChatList from '@components/ChatList/ChatList';
import Navbar from '@components/Navbar/Navbar';
import Search from '@components/Search/Search';
import SearchChatList from '@components/SearchChatList/SearchChatList';
import ProfileSettings from '@components/ProfileSettings/ProfileSettings';
import useChatStore from '@zustand/store';
import { ISidebarProps } from '@interfaces/ISidebarProps';

function Sidebar({ setScreen }: ISidebarProps) {
  const sidebarScreen = useChatStore(state => state.sidebarScreen);

  console.log('screen --> Sidebar');

  return (
    <div className="relative w-full h-full bg-myBlackBcg sm:min-w-400px sm:w-1/4 border-r">
      {sidebarScreen === 'default' && (
        <>
          <div className="flex gap-2 px-3 py-2 bg-myBlackBcg">
            <Navbar />
            <Search />
          </div>
          <Scrollbars
            autoHide
            style={{
              width: '100%',
              height: 'calc(100% - 48px)',
            }}
          >
            <SearchChatList setScreen={setScreen} />
            <ChatList setScreen={setScreen} />
          </Scrollbars>
        </>
      )}
      {sidebarScreen === 'profileSettings' && <ProfileSettings />}
    </div>
  );
}

export default Sidebar;
