import useChatStore from '@zustand/store';
import {
  DocumentData,
  QuerySnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import capitalizeName from '@components/Search/utils/capitalizeFirstLetterName';
import { auth, db } from '@myfirebase/config';

// создаем общий ИД для общего чата + обновляем списки чатов у 2их юзеров(1. я как текущий и 2. тот которого выбрал)
const handleCreateChat = async (
  user: DocumentData,
  setChatList: React.Dispatch<
    React.SetStateAction<QuerySnapshot<DocumentData, DocumentData> | []>
  >,
  // setSearchUsers: (value: string) => void
  updateSearchValue: (value: string) => void
) => {
  // выйдем если не авторизирован
  if (!auth?.currentUser?.uid) return;

  const currentUserUID = auth?.currentUser?.uid;
  const selectionUserUID = user.uid;

  const combinedUsersChatID =
    currentUserUID && currentUserUID > selectionUserUID
      ? currentUserUID + selectionUserUID
      : selectionUserUID + currentUserUID;

  try {
    // проверим есть ли такой чат уже у нас
    const res = await getDoc(doc(db, 'chats', combinedUsersChatID));

    console.log('res getDoc combinedUsersChatID', res);

    if (!res.exists()) {
      // если нету чата, создаем
      await setDoc(doc(db, 'chats', combinedUsersChatID), { messages: [] });

      // обновляем обьект с нашими чатами и у нас появиться чат в списке чатов
      await updateDoc(doc(db, 'userChats', currentUserUID), {
        [combinedUsersChatID + '.userInfo']: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        [combinedUsersChatID + '.date']: serverTimestamp(),
      });

      // обновляем обьект для юзера с которым создаем чат чтобы у него появился чат в списке чатов
      await updateDoc(doc(db, 'userChats', selectionUserUID), {
        [combinedUsersChatID + '.userInfo']: {
          uid: auth?.currentUser.uid,
          displayName: auth?.currentUser.displayName,
          photoURL: auth?.currentUser.photoURL,
        },
        [combinedUsersChatID + '.date']: serverTimestamp(),
      });
    }

    setChatList([]);
    // setSearchUsers('');
    updateSearchValue('');
  } catch (error) {
    console.log('error handleCreateChat', error);
  }
};

export default function SearchChatList() {
  const [searchChatList, setSearchChatList] = useState<
    QuerySnapshot<DocumentData, DocumentData> | []
  >([]);

  const searchValue = useChatStore(state => state.searchValue);
  const updateSearchValue = useChatStore(state => state.updateSearchValue);

  // юзефект для поиска контактов(юзеров) в поисковой строке
  useEffect(() => {
    const fetchData = async () => {
      // if (searchUsers.trim() === '') {
      if (searchValue.trim() === '') {
        setSearchChatList([]);
        return;
      }

      const queryName = capitalizeName(searchValue);

      const usersRef = collection(db, 'users');
      const q = query(
        usersRef,
        where('displayName', '>=', queryName),
        where('displayName', '<=', queryName + '\uf8ff')
      );

      try {
        const querySnapshot = await getDocs(q);

        setSearchChatList(querySnapshot);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchValue]);

  return (
    <div>
      <ul className="bg-myBlackBcg">
        {/* тут список юзеров в поиске */}
        {searchChatList instanceof QuerySnapshot &&
          searchChatList.docs.map(doc => {
            console.log('chatList search doc', doc.data());
            return (
              <li
                className="flex"
                key={doc.id}
                onClick={() =>
                  // handleCreateChat(doc.data(), setChatList, setSearchUsers)
                  handleCreateChat(
                    doc.data(),
                    setSearchChatList,
                    updateSearchValue
                  )
                }
              >
                <img
                  width={24}
                  height={24}
                  src={doc.data().photoURL}
                  alt={doc.data().displayName}
                />

                <p className="text-white">{doc.data().displayName}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
