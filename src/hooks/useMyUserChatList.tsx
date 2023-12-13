import { useEffect, useState } from 'react'
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';

import { db } from '@myfirebase/config';
import useChatStore from '@zustand/store';

const useMyUserChatList = () => {
  const [myUserChatList, setMyUserChatList] = useState<DocumentData | []>([]);

  const { chatUID } = useChatStore(state => state.currentChatInfo);
  const { uid } = useChatStore(state => state.currentUser);
  // юзефект для загрузки списка моих чатов
  useEffect(() => {
    if (!uid) return;
    // ==========================================
    const unsubMyUserChats = onSnapshot(doc(db, 'userChats', uid), doc => {
      const data = doc.data();
      if (data) {
        // чтобы не пригал сайдбар в чате;
        // после uodate last message из-за асинхронщины сначала date: null приходит, а потом аж date: _Timestamp поэтому чтобы не пригал список 2 раза делаем проверку на null
        if (chatUID && !data?.[chatUID].date) {
          return;
        }

        const entries = Object.entries(data).sort(
          (a, b) => b[1].date - a[1].date
        );

        console.log('entries', entries);

        setMyUserChatList(entries);
      }
    });

    return () => {
      unsubMyUserChats();
    };
  }, [chatUID, uid]);

  return myUserChatList;
};
export default useMyUserChatList;
