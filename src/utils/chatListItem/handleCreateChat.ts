import {
  DocumentData,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { NavigateFunction } from 'react-router-dom';

import { auth, db } from '@myfirebase/config';
import handleSelectChat from '@utils/chatListItem/handleSelectChat';
import { ChatListItemType } from 'types/ChatListItemType';

// создаем общий ИД для общего чата + обновляем списки чатов у 2их юзеров(1. я как текущий и 2. тот которого выбрал)
const handleCreateChat = async (
  user: DocumentData,
  updateCurrentChatInfo: (chat: ChatListItemType) => void,
  navigate: NavigateFunction
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

    if (!res.exists()) {
      // если нету чата, создаем
      await setDoc(doc(db, 'chats', combinedUsersChatID), {});

      // обновляем обьект с нашими чатами и у нас появиться чат в списке чатов
      await updateDoc(doc(db, 'userChats', currentUserUID), {
        [combinedUsersChatID + '.userUID']: user.uid,
        [combinedUsersChatID + '.date']: serverTimestamp(),
      });

      // обновляем обьект для юзера с которым создаем чат чтобы у него появился чат в списке чатов
      await updateDoc(doc(db, 'userChats', selectionUserUID), {
        [combinedUsersChatID + '.userUID']: auth?.currentUser.uid,
        [combinedUsersChatID + '.date']: serverTimestamp(),
      });
    }

    // делаем селект чат чтобы он открылся сразу
    const newResponse = await getDoc(doc(db, 'userChats', currentUserUID));

    const chatItem: ChatListItemType = [
      combinedUsersChatID,
      {
        lastMessage: newResponse.data()?.[combinedUsersChatID].lastMessage,
        senderUserID: newResponse.data()?.[combinedUsersChatID].senderUserID,
        userUID: newResponse.data()?.[combinedUsersChatID].userUID,
      },
    ];

    handleSelectChat(chatItem, updateCurrentChatInfo);
    navigate(combinedUsersChatID);
  } catch (error) {
    console.log('error handleCreateChat', error);
  }
};

export default handleCreateChat;
