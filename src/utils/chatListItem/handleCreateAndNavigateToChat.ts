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
import { ChatListItem } from 'types/ChatListItemType';

const createNewChat = async (chatID: string): Promise<void> => {
  await setDoc(doc(db, 'chats', chatID), {});
};

const updateUserChatList = async (
  userUID: string,
  chatID: string,
  otherUserUID: string
): Promise<void> => {
  await updateDoc(doc(db, 'userChats', userUID), {
    [`${chatID}.userUID`]: otherUserUID,
    [`${chatID}.date`]: serverTimestamp(),
  });
};

const checkChatExists = async (chatID: string): Promise<boolean> => {
  const res = await getDoc(doc(db, 'chats', chatID));
  return res.exists();
};

const getChatData = async (
  userUID: string,
  chatID: string
): Promise<DocumentData> => {
  const res = await getDoc(doc(db, 'userChats', userUID));
  return res.data()?.[chatID];
};

const handleCreateAndNavigateToChat = async (
  user: DocumentData,
  updateCurrentChatInfo: (chat: ChatListItem) => void,
  navigate: NavigateFunction
): Promise<void> => {
  if (!auth?.currentUser?.uid) return;

  const currentUserUID = auth.currentUser.uid;
  const selectionUserUID = user.uid;

  const combinedUsersChatID =
    currentUserUID > selectionUserUID
      ? currentUserUID + selectionUserUID
      : selectionUserUID + currentUserUID;

  try {
    // проверим есть ли такой чат уже у нас
    const chatExists = await checkChatExists(combinedUsersChatID);

    if (!chatExists) {
      // если нету чата, создаем
      await createNewChat(combinedUsersChatID);
      // обновляем обьекты с нашими чатами и у нас появиться чат в списке чатов
      await updateUserChatList(
        currentUserUID,
        combinedUsersChatID,
        selectionUserUID
      );
      await updateUserChatList(
        selectionUserUID,
        combinedUsersChatID,
        currentUserUID
      );
    }

    // делаем селект чат чтобы он открылся сразу
    const chatData = await getChatData(currentUserUID, combinedUsersChatID);

    if (chatData) {
      const chatItem: ChatListItem = [
        combinedUsersChatID,
        {
          lastMessage: chatData.lastMessage,
          senderUserID: chatData.senderUserID,
          userUID: chatData.userUID,
        },
      ];

      handleSelectChat(chatItem, updateCurrentChatInfo);
      navigate(combinedUsersChatID);
    }
  } catch (error) {
    console.log('error handleCreateAndNavigateToChat', error);
  }
};

export default handleCreateAndNavigateToChat;
