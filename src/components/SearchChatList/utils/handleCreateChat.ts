import {
  DocumentData,
  QuerySnapshot,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

import { auth, db } from '@myfirebase/config';
import handleSelectChat from '@utils/handleSelectChat';
import { TScreen } from '@pages/Home/Home';
import { TChatListItem } from 'types/TChatListItem';

// создаем общий ИД для общего чата + обновляем списки чатов у 2их юзеров(1. я как текущий и 2. тот которого выбрал)
const handleCreateChat = async (
  user: DocumentData,
  setChatList: React.Dispatch<
    React.SetStateAction<QuerySnapshot<DocumentData, DocumentData> | null>
  >,
  updateSearchValue: (value: string) => void,
  updateCurrentChatInfo: (chat: TChatListItem) => void,
  setScreen?: (value: TScreen) => void
) => {
  // выйдем если не авторизирован
  if (!auth?.currentUser?.uid) return;

  console.log('user in handleCreateChat', user);

  const currentUserUID = auth?.currentUser?.uid;
  const selectionUserUID = user.uid;

  const combinedUsersChatID =
    currentUserUID && currentUserUID > selectionUserUID
      ? currentUserUID + selectionUserUID
      : selectionUserUID + currentUserUID;

  try {
    // проверим есть ли такой чат уже у нас
    const res = await getDoc(doc(db, 'chats', combinedUsersChatID));

    // console.log('res getDoc combinedUsersChatID', res);

    // console.log('user.photoURL ', user.photoURL);

    if (!res.exists()) {
      // если нету чата, создаем
      // await setDoc(doc(db, 'chats', combinedUsersChatID), { messages: {} });
      await setDoc(doc(db, 'chats', combinedUsersChatID), {});

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

      // делаем селект чат чтобы он открылся сразу
      const res = await getDoc(doc(db, 'userChats', currentUserUID));

      const chatItem: TChatListItem = [
        combinedUsersChatID,
        {
          lastMessage: res.data()?.[combinedUsersChatID].lastMessage,
          userInfo: res.data()?.[combinedUsersChatID].userInfo,
        },
      ];

      handleSelectChat(chatItem, updateCurrentChatInfo, setScreen);
    }

    setChatList(null);
    updateSearchValue('');
  } catch (error) {
    console.log('error handleCreateChat', error);
  }
};

export default handleCreateChat;
