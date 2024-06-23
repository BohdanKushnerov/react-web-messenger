import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { doc, getDoc } from 'firebase/firestore';

import { db } from '@myfirebase/config';

import useChatStore from '@zustand/store';

import handleSelectChat from '@utils/chatListItem/handleSelectChat';

import { ISelectedChatInfo } from '@interfaces/ISelectedChatInfo';

const useIsRedirectToCurrentChat = () => {
  const navigate = useNavigate();

  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const updateCurrentChatInfo = useChatStore(
    state => state.updateCurrentChatInfo
  );

  useEffect(() => {
    const isRedirectToCurrentChat = async (
      currentUserUID: string | null,
      handleSelectChat: (
        chat: ISelectedChatInfo,
        updateCurrentChatInfo: (chat: ISelectedChatInfo) => void
      ) => void,
      updateCurrentChatInfo: (chat: ISelectedChatInfo) => void
    ) => {
      const combinedUsersChatUID = localStorage.getItem('currentChatId');

      if (combinedUsersChatUID && currentUserUID) {
        const resUserChats = await getDoc(doc(db, 'userChats', currentUserUID));

        const resUser = await getDoc(
          doc(db, 'users', resUserChats.data()?.[combinedUsersChatUID].userUID)
        );

        const selectedChatInfo: ISelectedChatInfo = {
          chatUID: combinedUsersChatUID,
          userUID: resUserChats.data()?.[combinedUsersChatUID].userUID,
          tokenFCM: resUser.data()?.tokenFCM as string,
        };

        handleSelectChat(selectedChatInfo, updateCurrentChatInfo);
        navigate(combinedUsersChatUID);
      }
    };

    isRedirectToCurrentChat(
      currentUserUID,
      handleSelectChat,
      updateCurrentChatInfo
    );
  }, [currentUserUID, navigate, updateCurrentChatInfo]);
};

export default useIsRedirectToCurrentChat;
