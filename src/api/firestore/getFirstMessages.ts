import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';

import { db } from '@myfirebase/config';

const getFirstMessages = (chatUID: string) => {
  const queryParams = query(
    collection(db, `chats/${chatUID}/messages`),
    orderBy('date', 'desc'),
    limit(20)
  );

  return getDocs(queryParams);
};

export default getFirstMessages;
