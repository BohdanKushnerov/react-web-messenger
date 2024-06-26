import { MutableRefObject } from 'react';

import {
  DocumentData,
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
  lastLoadedMsg: MutableRefObject<DocumentData | null>
) => {
  const queryParams = query(
    collection(db, `chats/${chatUID}/messages`),
    orderBy('date', 'desc'),
    startAfter(lastLoadedMsg.current),
    limit(15)
  );

  return await getDocs(queryParams);
};

export default getMessagesAfterLastLoaded;
