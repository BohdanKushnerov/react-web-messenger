import { useEffect, useState } from 'react';
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';

import { auth, db } from '@myfirebase/config';
// import useChatStore from '@zustand/store';

const useMyUserChatList = () => {
  const [myUserChatList, setMyUserChatList] = useState<DocumentData | []>([]);

  // const { chatUID } = useChatStore(state => state.currentChatInfo);
  // console.log('myUserChatList', myUserChatList);
  // console.log('chatUID', chatUID);

  // юзефект для загрузки списка моих чатов
  // useEffect(() => {
  //   if (!auth?.currentUser?.uid) return;
  //   // ==========================================
  //   const unsubMyUserChats = onSnapshot(
  //     doc(db, 'userChats', auth?.currentUser?.uid),
  //     doc => {
  //       const data = doc.data();

  //       for (const key in data) {
  //         if (Object.prototype.hasOwnProperty.call(data, key)) {
  //           const element = data[key];
  //           if (element.data === null) return;
  //         }
  //       }

  //       if (data) {
  //         // чтобы не пригал сайдбар в чате;
  //         // после update last message из-за асинхронщины сначала date: null приходит, а потом аж date: _Timestamp поэтому чтобы не пригал список 2 раза делаем проверку на null
  //         // if (chatUID && !data?.[chatUID].date) {
  //         //   return;
  //         // }

  //         const entries = Object.entries(data).sort(
  //           (a, b) => b[1].date - a[1].date
  //         );

  //         setMyUserChatList(entries);
  //       }
  //     }
  //   );

  //   return () => {
  //     unsubMyUserChats();
  //   };
  // }, []);

  useEffect(() => {
    if (!auth?.currentUser?.uid) return;

    const unsubMyUserChats = onSnapshot(
      doc(db, 'userChats', auth?.currentUser?.uid),
      doc => {
        const data = doc.data();

        // Флаг, который определяет, нужно ли обновлять список чатов
        let shouldUpdateChatList = true;

        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const element = data[key];
            // console.log(element.date)
            if (element.date === null) {
              shouldUpdateChatList = false;
              break; // Прерываем цикл, так как уже есть нулевой элемент
            }
          }
        }

        if (shouldUpdateChatList && data) {
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
  }, []);

  return myUserChatList;
};
export default useMyUserChatList;
