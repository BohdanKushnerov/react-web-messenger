import { NavigateFunction } from 'react-router-dom';

import {
  DocumentData,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

import { auth, db } from '@myfirebase/config';

import handleSelectChat from '@utils/chatListItem/handleSelectChat';

import { ISelectedChatInfo } from '@interfaces/ISelectedChatInfo';

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
  updateCurrentChatInfo: (chat: ISelectedChatInfo) => void,
  navigate: NavigateFunction
): Promise<void> => {
  if (!auth?.currentUser?.uid) return;

  const currentUserUID = auth.currentUser.uid;
  const selectionUserUID = user.uid;

  const combinedUsersChatUID =
    currentUserUID > selectionUserUID
      ? currentUserUID + selectionUserUID
      : selectionUserUID + currentUserUID;

  try {
    const chatExists = await checkChatExists(combinedUsersChatUID);

    if (!chatExists) {
      await createNewChat(combinedUsersChatUID);
      await updateUserChatList(
        currentUserUID,
        combinedUsersChatUID,
        selectionUserUID
      );
      await updateUserChatList(
        selectionUserUID,
        combinedUsersChatUID,
        currentUserUID
      );
    }

    const chatData = await getChatData(currentUserUID, combinedUsersChatUID);

    const resUser = await getDoc(doc(db, 'users', chatData.userUID));

    if (chatData && resUser) {
      const selectedChatInfo: ISelectedChatInfo = {
        chatUID: combinedUsersChatUID,
        userUID: chatData.userUID,
        tokenFCM: resUser.data()?.tokenFCM as string,
      };

      handleSelectChat(selectedChatInfo, updateCurrentChatInfo);
      navigate(combinedUsersChatUID);
    }
  } catch (error) {
    console.log('handleCreateAndNavigateToChat error', error);
  }
};

export default handleCreateAndNavigateToChat;
