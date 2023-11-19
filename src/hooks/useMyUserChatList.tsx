import { useEffect, useState } from 'react'
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';

import useChatStore from '@zustand/store';
import { auth, db } from '@myfirebase/config';

const useMyUserChatList = () => {
  const [myUserChatList, setMyUserChatList] = useState<DocumentData | []>([]);

  const { chatUID } = useChatStore(state => state.currentChatInfo);
  // юзефект для загрузки списка моих чатов
  useEffect(() => {
    if (!auth?.currentUser?.uid) return;
    // ==========================================
    const unsubMyUserChats = onSnapshot(
      doc(db, 'userChats', auth?.currentUser?.uid),
      doc => {
        const data = doc.data();
        if (data) {
          // после uodate last message из-за асинхронщины сначала date: null приходит, а потом аж date: _Timestamp поэтому чтобы не пригал список 2 раза делаем проверку на null
          if (chatUID && !data?.[chatUID].date) {
            return;
          }

          const entries = Object.entries(data).sort(
            (a, b) => b[1].date - a[1].date
          );

          setMyUserChatList(entries);
        }
      }
    );

    return () => {
      unsubMyUserChats();
    };
  }, [chatUID]);

  return myUserChatList;
};
export default useMyUserChatList;
