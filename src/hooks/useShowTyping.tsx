import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';

import useChatStore from '@zustand/store';
import { db } from '@myfirebase/config';

const useShowTyping = () => {
  const [isOpponentTyping, setIsOpponentTyping] = useState(false);

  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const { chatUID, userUID } = useChatStore(state => state.currentChatInfo);
  
  // тут слушатель на изменения печатает/не печатает
  useEffect(() => {
    if (!chatUID || !userUID) {
      return;
    }

    const chatDocRef = doc(db, 'chats', chatUID);

    const unsubOponentTypingStatus = onSnapshot(
      chatDocRef,
      docSnapshot => {
        if (docSnapshot.exists()) {
          const chatData = docSnapshot.data();

          // тут проверка, потому что когда создал чат ты первый то у тебя еще нету его обьекта,
          // он появиться когда он начнет перчатать
          if (
            chatData[userUID]?.isTyping === false ||
            chatData[userUID]?.isTyping === true
          ) {
            setIsOpponentTyping(chatData[userUID].isTyping);
          }
        }
      },
      error => {
        console.error('error listener of isTyping:', error);
      }
    );

    return () => {
      unsubOponentTypingStatus();
    };
  }, [chatUID, currentUserUID, userUID]);

  return isOpponentTyping;

  // // тут слушатель на изменения печатает/не печатает
  // useEffect(() => {
  //   if (!chatUID || !userUID) {
  //     return;
  //   }

  //   const chatDocRef = doc(db, 'chats', chatUID);

  //   const unsubOponentTypingStatus = onSnapshot(
  //     chatDocRef,
  //     docSnapshot => {
  //       if (docSnapshot.exists()) {
  //         const chatData = docSnapshot.data();

  //         // тут проверка, потому что когда создал чат ты первый то у тебя еще нету его обьекта,
  //         // он появиться когда он начнет перчатать
  //         if (
  //           chatData[userUID]?.isTyping === false ||
  //           chatData[userUID]?.isTyping === true
  //         ) {
  //           setIsOpponentTyping(chatData[userUID].isTyping);
  //         }
  //       }
  //     },
  //     error => {
  //       console.error('error listener of isTyping:', error);
  //     }
  //   );

  //   return () => {
  //     unsubOponentTypingStatus();
  //   };
  // }, [chatUID, currentUserUID, userUID]);
};

export default useShowTyping;
