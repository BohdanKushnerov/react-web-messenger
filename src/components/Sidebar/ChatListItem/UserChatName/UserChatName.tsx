import { FC, useEffect, useState } from 'react';
import {
  collection,
  DocumentData,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';

import { db } from '@myfirebase/config';
import truncateLastMessageString from '@utils/chatListItem/truncateLastMessageString';
import { IUserChatNameProps } from '@interfaces/IUserChatNameProps';

const UserChatName: FC<IUserChatNameProps> = ({
  currentChatUID,
  itemChatUID,
  userInfo,
}) => {
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

  return (
    <div className="w-full">
      <p
        className={`font-bold ${
          currentChatUID === itemChatUID
            ? 'text-white'
            : 'text-zinc-900 dark:text-white'
        }`}
      >
        {userInfo?.displayName}
      </p>
      <p
        className={`w-full sm:w-[100px] md:hidden ${
          currentChatUID === itemChatUID
            ? 'text-white'
            : 'text-zinc-600 dark:text-zinc-100'
        }`}
      >
        {lastMsg && truncateLastMessageString(lastMsg, 10)}
      </p>
      <p
        className={`hidden md:block ${
          currentChatUID === itemChatUID
            ? 'text-white'
            : 'text-zinc-600 dark:text-zinc-100'
        }`}
      >
        {lastMsg && truncateLastMessageString(lastMsg, 25)}
      </p>
    </div>
  );
};

export default UserChatName;
