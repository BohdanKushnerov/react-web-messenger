import { useEffect, useState } from 'react';

import type { DocumentData } from 'firebase/firestore';
import { doc, onSnapshot } from 'firebase/firestore';

import { db } from '@myfirebase/config';

import type { UseChatInfo } from 'types/hooks/UseChatInfo';

const useChatInfo: UseChatInfo = userUID => {
  const [currentChatInfo, setCurrentChatInfo] = useState<DocumentData | null>(
    null
  );

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
