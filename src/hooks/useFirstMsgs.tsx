import { useEffect } from 'react';

import useChatStore from '@zustand/store';

import getFirstMessages from '@api/firestore/getFirstMessages';

import { IGroupedMessages } from '@interfaces/IGroupedMessages';

import { UseGetFirstMsgs } from 'types/hooks/UseGetFirstMsgs';

import '@i18n';

const useGetFirstMsgs: UseGetFirstMsgs = (
  isReadyToFetchFirstNewChatMsgs,
  lastLoadedMsg,
  setIsReadyFirstMsgs,
  setGroupedMessages
) => {
  const { chatUID } = useChatStore(state => state.currentChatInfo);

  useEffect(() => {
    if (isReadyToFetchFirstNewChatMsgs.current === false) {
      return;
    }

    const fetchFirstMsgs = async (chatUID: string | null) => {
      if (!chatUID) return;

      try {
        const snapshot = await getFirstMessages(chatUID);

        if (!snapshot.empty) {
          const updatedMessages = snapshot.docs;
          const lastVisible = updatedMessages[updatedMessages.length - 1];

          lastLoadedMsg.current = lastVisible;

          const groupedMsgs = updatedMessages.reduce((acc, message) => {
            const messageData = message.data();
            if (messageData?.date) {
              const date = messageData.date.toDate();
              const dateString = date.toISOString().split('T')[0];

              acc[dateString] = acc[dateString] || [];
              acc[dateString].push(message);
            }

            return acc;
          }, {} as IGroupedMessages);

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
          setGroupedMessages({});
          lastLoadedMsg.current = null;
          setIsReadyFirstMsgs(true);
        }
      } catch (error) {
        console.error('fetchFirstMsgs error', error);
      }
    };

    fetchFirstMsgs(chatUID);
  }, [
    chatUID,
    isReadyToFetchFirstNewChatMsgs,
    lastLoadedMsg,
    setGroupedMessages,
    setIsReadyFirstMsgs,
  ]);
};

export default useGetFirstMsgs;
