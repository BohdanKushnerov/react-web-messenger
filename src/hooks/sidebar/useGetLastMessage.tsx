import { useEffect, useState } from 'react';

import type { DocumentData } from 'firebase/firestore';
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';

import { db } from '@myfirebase/config';

type UseGetLastMessage = (itemChatUID: string | null) => DocumentData | null;

const useGetLastMessage: UseGetLastMessage = itemChatUID => {
  const [lastMessage, setLastMessage] = useState<DocumentData | null>(null);

  useEffect(() => {
    const queryParams = query(
      collection(db, `chats/${itemChatUID}/messages`),
      orderBy('date', 'desc'),
      limit(1)
    );

    const unsubChatMessages = onSnapshot(queryParams, snapshot => {
      if (!snapshot.empty) {
        const lastMessage: DocumentData = snapshot.docs[0].data();
        setLastMessage(lastMessage);
      } else {
        setLastMessage(null);
      }
    });

    return () => {
      unsubChatMessages();
    };
  }, [itemChatUID]);

  return lastMessage;
};

export default useGetLastMessage;
