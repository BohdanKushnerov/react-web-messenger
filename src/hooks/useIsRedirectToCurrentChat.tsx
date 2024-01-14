import { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import { db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import handleSelectChat from '@utils/handleSelectChat';
import { ChatListItemType } from 'types/ChatListItemType';
import { CurrentChatInfo } from 'types/CurrentChatInfo';

const useIsRedirectToCurrentChat = () => {
  const navigate = useNavigate();

  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const updateCurrentChatInfo = useChatStore(
    state => state.updateCurrentChatInfo
  );

  useEffect(() => {
    async function isRedirectToCurrentChat(
      currentUserUID: string | null,
      handleSelectChat: (
        chat: ChatListItemType,
        updateCurrentChatInfo: (chat: ChatListItemType) => void
      ) => void,
      updateCurrentChatInfo: (chat: CurrentChatInfo) => void
    ) {
      const combinedUsersChatUID = localStorage.getItem('currentChatId');

      if (combinedUsersChatUID && currentUserUID) {
        const res = await getDoc(doc(db, 'userChats', currentUserUID));

        const chatItem: ChatListItemType = [
          combinedUsersChatUID,
          {
            lastMessage: res.data()?.[combinedUsersChatUID].lastMessage,
            senderUserID: res.data()?.[combinedUsersChatUID].senderUserID,
            userUID: res.data()?.[combinedUsersChatUID].userUID,
          },
        ];

        handleSelectChat(chatItem, updateCurrentChatInfo);
        navigate(combinedUsersChatUID);
      }
    }

    isRedirectToCurrentChat(
      currentUserUID,
      handleSelectChat,
      updateCurrentChatInfo
    );
  }, [currentUserUID, navigate, updateCurrentChatInfo]);
};

export default useIsRedirectToCurrentChat;
