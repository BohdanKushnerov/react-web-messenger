import ChatList from '@components/ChatList/ChatList'
import Navbar from '@components/Navbar/Navbar'
import Search from '@components/Search/Search'
import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import {useState} from 'react'

export default function Sidebar() {
    const [chatList, setChatList] = useState<QuerySnapshot<
      DocumentData,
      DocumentData
    > | null>(null);


  return (
    <div className="bg-gray-300 w-80">
      <div className="flex pl-1 pr-2 py-1">
        <Navbar />
        <Search setChatList={setChatList} />
      </div>
      <ChatList chatList={chatList} />
    </div>
  );
}
