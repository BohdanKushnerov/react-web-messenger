import { useEffect, useState } from 'react';

import {
  DocumentData,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';

import { db } from '@myfirebase/config';

import { UseGetLastMessage } from 'types/hooks/UseGetLastMessage';

const useGetLastMessage: UseGetLastMessage = itemChatUID => {
  const [lastMsg, setLastMsg] = useState<DocumentData | null>(null);

  useEffect(() => {
    const queryParams = query(
      collection(db, `chats/${itemChatUID}/messages`),
      orderBy('date', 'desc'),
      limit(1)
    );

    const unsubChatMessages = onSnapshot(queryParams, snapshot => {
      if (!snapshot.empty) {
        const lastMsg: DocumentData = snapshot.docs[0].data();
        setLastMsg(lastMsg);
      } else {
        setLastMsg(null);
      }
    });

    return () => {
      unsubChatMessages();
    };
  }, [itemChatUID]);

  return lastMsg;
};

export default useGetLastMessage;
