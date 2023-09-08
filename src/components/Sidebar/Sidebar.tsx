import ChatList from '@components/ChatList/ChatList';
import Navbar from '@components/Navbar/Navbar';
import Search from '@components/Search/Search';
import SearchChatList from '@components/SearchChatList/SearchChatList';
// import capitalizeName from '@components/Search/utils/capitalizeFirstLetterName';
// import { db } from '@myfirebase/config';
// import { useSearchUsers } from '@zustand/useSearchUsers';
// import {
//   DocumentData,
//   QuerySnapshot,
//   collection,
//   getDocs,
//   query,
//   where,
// } from 'firebase/firestore';
// import { useState, useEffect } from 'react';

export default function Sidebar() {
  // const [chatList, setChatList] = useState<
  //   QuerySnapshot<DocumentData, DocumentData> | []
  // >([]);

  // const searchValue = useSearchUsers(state => state.searchValue);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     // if (searchUsers.trim() === '') {
  //     if (searchValue.trim() === '') {
  //       setChatList([]);
  //       return;
  //     }

  //     const queryName = capitalizeName(searchValue);

  //     const usersRef = collection(db, 'users');
  //     const q = query(
  //       usersRef,
  //       where('displayName', '>=', queryName),
  //       where('displayName', '<=', queryName + '\uf8ff')
  //     );

  //     try {
  //       const querySnapshot = await getDocs(q);

  //       setChatList(querySnapshot);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, [searchValue, setChatList]);

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
