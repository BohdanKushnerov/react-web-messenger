import { useEffect, useState } from 'react'
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';

import { db } from '@myfirebase/config';

const useChatInfo = (userUID: string) => {
  const [currentChatInfo, setCurrentChatInfo] = useState<DocumentData | null>(
    null
  );

  // обновляет инфо о текущем юзере при монтировании нового чата
  useEffect(() => {
    if (!userUID) return;
    const unsubCurrentChatData = onSnapshot(doc(db, 'users', userUID), doc => {
      const data = doc.data();
      if (data) {
        setCurrentChatInfo(data);
      }
    });

    return () => {
      unsubCurrentChatData();
    };
  }, [userUID]);

  return currentChatInfo;
};

export default useChatInfo;
