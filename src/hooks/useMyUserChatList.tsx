import { useEffect, useState } from 'react';

import { DocumentData, doc, onSnapshot } from 'firebase/firestore';

import { auth, db } from '@myfirebase/config';

const useMyUserChatList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [myUserChatList, setMyUserChatList] = useState<DocumentData | null>(
    null
  );

  useEffect(() => {
    if (!auth?.currentUser?.uid) return;

    setIsLoading(true);

    const unsubMyUserChats = onSnapshot(
      doc(db, 'userChats', auth?.currentUser?.uid),
      doc => {
        const data = doc.data();

        let shouldUpdateChatList = true;

        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const element = data[key];
            if (!element.date) {
              shouldUpdateChatList = false;
              break;
            }
          }
        }

        if (shouldUpdateChatList && data) {
          const entries = Object.entries(data).sort(
            (a, b) => b[1].date - a[1].date
          );

          setMyUserChatList(entries);
          setIsLoading(false);
        }
      }
    );

    return () => {
      unsubMyUserChats();
    };
  }, []);

  return { isLoading, myUserChatList };
};

export default useMyUserChatList;
