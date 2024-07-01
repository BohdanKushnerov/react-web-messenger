import {
  type Dispatch,
  type MutableRefObject,
  type SetStateAction,
  useEffect,
} from 'react';

import type { DocumentData } from 'firebase/firestore';

import getFirstMessages from '@api/firestore/getFirstMessages';

import type { GroupedMessages } from 'types/GroupedMessages';

type UseGetFirstMessages = (
  chatUID: string | null,
  isReadyToFetchFirstNewChatMessages: MutableRefObject<boolean>,
  lastLoadedMessage: MutableRefObject<DocumentData | null>,
  setIsReadyFirstMessages: Dispatch<SetStateAction<boolean>>,
  setGroupedMessages: Dispatch<SetStateAction<GroupedMessages | null>>
) => void;

const useGetFirstMessages: UseGetFirstMessages = (
  chatUID,
  isReadyToFetchFirstNewChatMessages,
  lastLoadedMessage,
  setIsReadyFirstMessages,
  setGroupedMessages
) => {
  useEffect(() => {
    if (isReadyToFetchFirstNewChatMessages.current === false) {
      return;
    }

    const fetchFirstMessages = async (chatUID: string | null) => {
      if (!chatUID) return;

      try {
        const snapshot = await getFirstMessages(chatUID);

        if (!snapshot.empty) {
          const updatedMessages = snapshot.docs;
          const lastVisible = updatedMessages[updatedMessages.length - 1];

          lastLoadedMessage.current = lastVisible;

          const groupedMessages = updatedMessages.reduce((acc, message) => {
            const messageData = message.data();
            if (messageData?.date) {
              const date = messageData.date.toDate();
              const dateString = date.toISOString().split('T')[0];

              acc[dateString] = acc[dateString] || [];
              acc[dateString].push(message);
            }

            return acc;
          }, {} as GroupedMessages);

          const entries = Object.entries(groupedMessages);
          entries.forEach(arr => arr[1].reverse());
          entries.sort(
            ([dateA], [dateB]) =>
              new Date(dateA).getTime() - new Date(dateB).getTime()
          );
          const sortedData = Object.fromEntries(entries);

          setGroupedMessages(sortedData);
          setIsReadyFirstMessages(true);

          isReadyToFetchFirstNewChatMessages.current = false;
        } else {
          setGroupedMessages({});
          lastLoadedMessage.current = null;
          setIsReadyFirstMessages(true);
        }
      } catch (error) {
        console.error('fetchFirstMessages', error);
      }
    };

    fetchFirstMessages(chatUID);
  }, [
    chatUID,
    isReadyToFetchFirstNewChatMessages,
    lastLoadedMessage,
    setGroupedMessages,
    setIsReadyFirstMessages,
  ]);
};

export default useGetFirstMessages;
