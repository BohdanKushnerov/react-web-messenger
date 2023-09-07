import ChatList from '@components/ChatList/ChatList'
import Navbar from '@components/Navbar/Navbar'
import Search from '@components/Search/Search'
import capitalizeName from '@components/Search/utils/capitalizeFirstLetterName';
import { db } from '../../firebase/config';
import { DocumentData, QuerySnapshot, collection, getDocs, query, where } from 'firebase/firestore';
import { useState, useEffect } from 'react';

export default function Sidebar() {
    const [searchUsers, setSearchUsers] = useState('');
    const [chatList, setChatList] = useState<QuerySnapshot<
      DocumentData,
      DocumentData
    > | []>([]);

      useEffect(() => {
        const fetchData = async () => {
          if (searchUsers.trim() === '') {
            setChatList([]);
            return;
          }

          const queryName = capitalizeName(searchUsers);

          const usersRef = collection(db, 'users');
          const q = query(
            usersRef,
            where('displayName', '>=', queryName),
            where('displayName', '<=', queryName + '\uf8ff')
          );

          try {
            const querySnapshot = await getDocs(q);

            setChatList(querySnapshot);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };

        fetchData();
      }, [searchUsers, setChatList]);


  return (
    <div className="bg-gray-300 w-80">
      <div className="flex pl-1 pr-2 py-1">
        <Navbar />
        <Search
          searchUsers={searchUsers}
          setSearchUsers={setSearchUsers}
          // setChatList={setChatList}
        />
      </div>
      <ChatList
        setSearchUsers={setSearchUsers}
        chatList={chatList}
        setChatList={setChatList}
      />
    </div>
  );
}
