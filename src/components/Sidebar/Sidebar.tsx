import { signOut } from 'firebase/auth';
import Scrollbars from 'react-custom-scrollbars-2';

import ChatList from '@components/ChatList/ChatList';
import Navbar from '@components/Navbar/Navbar';
import Search from '@components/Search/Search';
import SearchChatList from '@components/SearchChatList/SearchChatList';
import { auth } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import { TScreen } from '@pages/Home/Home';

interface ISidebar {
  setScreen?: (value: TScreen) => void;
}

function Sidebar({ setScreen }: ISidebar) {
  const { currentUser } = useChatStore(state => state);

  const handleSignOut = async () => {
    const exit = await signOut(auth);
    console.log('exit', exit);
  };

  return (
    // <div className="bg-myBlackBcg min-w-300px w-1/4 h-screen border-r">
    <div className="bg-myBlackBcg w-full sm:min-w-400px sm:w-1/4 h-screen border-r">
      <div className="flex gap-2 px-3 py-2 bg-myBlackBcg">
        <Navbar />
        <Search />
      </div>
      <div className="bg-gray-100">
        <p>{currentUser?.displayName}</p>
        <button className="border border-gray-600" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
      <Scrollbars
        autoHide
        style={{
          width: '100%',
          //  height: '80vh',
          height: 'calc(100vh - 48px - 80px)',
        }}
      >
        <SearchChatList />
        <ChatList setScreen={setScreen} />
      </Scrollbars>
    </div>
  );
}

export default Sidebar;
