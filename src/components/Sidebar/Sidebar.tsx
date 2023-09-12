import ChatList from '@components/ChatList/ChatList';
import Navbar from '@components/Navbar/Navbar';
import Search from '@components/Search/Search';
import SearchChatList from '@components/SearchChatList/SearchChatList';
import { auth } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import { signOut } from 'firebase/auth';

export default function Sidebar() {
  const { currentUser } = useChatStore(state => state);

  const handleSignOut = async () => {
    const exit = await signOut(auth);
    console.log('exit', exit);
  };

  return (
    <div className="bg-myBlackBcg w-80 h-screen border-r">
      <div className="flex px-2 py-2 bg-myBlackBcg">
        <Navbar />
        <Search />
      </div>
      <div className="bg-gray-100">
        <p>{currentUser?.displayName}</p>
        <button className="border border-gray-600" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
      <SearchChatList />
      <ChatList />
    </div>
  );
}
