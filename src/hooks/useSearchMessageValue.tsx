import { useEffect, useState } from 'react';

import {
  DocumentData,
  collection,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';

import { db } from '@myfirebase/config';

import useChatStore from '@zustand/store';

const useSearchMessageValue = () => {
  const [searchMessageValue, setSearchMessageValue] = useState('');
  const [searchMessages, setSearchMessages] = useState<DocumentData[] | null>(
    null
  );

  const { chatUID } = useChatStore(state => state.currentChatInfo);

  useEffect(() => {
    if (!searchMessageValue) {
      setSearchMessages(null);
      return;
    }

    const queryParams = query(
      collection(db, `chats/${chatUID}/messages`),
      where('message', '>=', searchMessageValue),
      where('message', '<=', searchMessageValue + '\uf8ff')
    );

    const unsubSearchMessages = onSnapshot(queryParams, querySnapshot => {
      setSearchMessages(querySnapshot.docs);
    });

    return () => {
      unsubSearchMessages();
    };
  }, [chatUID, searchMessageValue]);

  return { searchMessages, searchMessageValue, setSearchMessageValue };
};

export default useSearchMessageValue;
