import { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react';
import {
  DocumentData,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from 'firebase/firestore';

import { db } from '@myfirebase/config';
import { IGroupedMessages } from '@interfaces/IGroupedMessages';
import '@i18n';

const useGetFirstMsgs = (
  chatUID: string | null,
  isReadyToFetchFirstNewChatMsgs: MutableRefObject<boolean>,
  lastLoadedMsg: MutableRefObject<DocumentData | null>,
  setIsReadyFirstMsgs: Dispatch<SetStateAction<boolean>>,
  setGroupedMessages: Dispatch<SetStateAction<IGroupedMessages | null>>
) => {
  useEffect(() => {
    if (isReadyToFetchFirstNewChatMsgs.current === false) {
      return;
    }

    async function fetchFirstMsgs() {
      const queryParams = query(
        collection(db, `chats/${chatUID}/messages`),
        orderBy('date', 'desc'),
        limit(20)
      );

      getDocs(queryParams).then(snapshot => {
        if (!snapshot.empty) {
          const updatedMessages: DocumentData[] = snapshot.docs;
          const lastVisible = updatedMessages[updatedMessages.length - 1];

          lastLoadedMsg.current = lastVisible;

          const groupedMsgs = updatedMessages.reduce((acc, message) => {
            const messageData = message.data();
            if (messageData && messageData.date) {
              const date = messageData.date.toDate();
              const dateString = date.toISOString().split('T')[0];

              acc[dateString] = acc[dateString] || [];
              acc[dateString].push(message);
            }

            return acc;
          }, {});

          const entries = Object.entries(groupedMsgs);
          entries.forEach(arr => arr[1].reverse());
          entries.sort(
            ([dateA], [dateB]) =>
              new Date(dateA).getTime() - new Date(dateB).getTime()
          );
          const sortedData = Object.fromEntries(entries);

          setGroupedMessages(sortedData);
          setIsReadyFirstMsgs(true);

          isReadyToFetchFirstNewChatMsgs.current = false;
        } else {
          setGroupedMessages({} as IGroupedMessages);
          lastLoadedMsg.current = null;
          setIsReadyFirstMsgs(true);
        }
      });
    }

    fetchFirstMsgs();
  }, [
    chatUID,
    isReadyToFetchFirstNewChatMsgs,
    lastLoadedMsg,
    setGroupedMessages,
    setIsReadyFirstMsgs,
  ]);

  return;
};

export default useGetFirstMsgs;
