import ChatList from '@components/ChatList/ChatList';
import Navbar from '@components/Navbar/Navbar';
import Search from '@components/Search/Search';
import SearchChatList from '@components/SearchChatList/SearchChatList';

export default function Sidebar() {

  return (
    <div className="bg-bg-myBlackBcg w-80">
      <div className="flex pl-1 pr-2 py-1 bg-myBlackBcg">
        <Navbar />
        <Search/>
      </div>
      <SearchChatList/>
      <ChatList/>
    </div>
  );
}
