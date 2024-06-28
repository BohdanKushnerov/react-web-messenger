import type { NavigateFunction } from 'react-router-dom';

import type { DocumentData } from 'firebase/firestore';

import { auth } from '@myfirebase/config';

import checkChatExists from '@api/firestore/checkChatExists';
import createNewChat from '@api/firestore/createNewChat';
import getChatData from '@api/firestore/getChatData';
import getUserData from '@api/firestore/getUserData';
import updateUserChatList from '@api/firestore/updateUserChatList';

import handleSelectChat from '@utils/chatListItem/handleSelectChat';

import type { ISelectedChatInfo } from '@interfaces/ISelectedChatInfo';

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

    const resUser = await getUserData(chatData.userUID);

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
