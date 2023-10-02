import Scrollbars from 'react-custom-scrollbars-2';

import ChatList from '@components/ChatList/ChatList';
import Navbar from '@components/Navbar/Navbar';
import Search from '@components/Search/Search';
import SearchChatList from '@components/SearchChatList/SearchChatList';
import { TScreen } from 'types/TScreen';

interface ISidebar {
  setScreen?: (value: TScreen) => void;
}

function Sidebar({ setScreen }: ISidebar) {
  // console.log('Sidebar');
  return (
    <div className="relative w-full h-full bg-myBlackBcg sm:min-w-400px sm:w-1/4 border-r">
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
    </div>
  );
}

export default Sidebar;
