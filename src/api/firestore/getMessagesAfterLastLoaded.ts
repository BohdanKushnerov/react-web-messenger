import type { MutableRefObject } from 'react';

import type { DocumentData } from 'firebase/firestore';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';

import { db } from '@myfirebase/config';

const getMessagesAfterLastLoaded = async (
  chatUID: string,
  lastLoadedMessage: MutableRefObject<DocumentData | null>
) => {
  const queryParams = query(
    collection(db, `chats/${chatUID}/messages`),
    orderBy('date', 'desc'),
    startAfter(lastLoadedMessage.current),
    limit(15)
  );

  return await getDocs(queryParams);
};

export default getMessagesAfterLastLoaded;
