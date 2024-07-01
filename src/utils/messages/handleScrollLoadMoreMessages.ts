import type { Dispatch, MutableRefObject, SetStateAction } from 'react';

import type { DocumentData } from 'firebase/firestore';

import groupNewMessages from './groupNewMessages';
import sortAndMergeScrollNewGroupedMessages from './sortAndMergeScrollNewGroupedMessages';

import getMessagesAfterLastLoaded from '@api/firestore/getMessagesAfterLastLoaded';

import type { GroupedMessages } from 'types/GroupedMessages';

const handleScrollLoadMoreMessages = async (
  chatUID: string | null,
  isInfinityScrollLoading: MutableRefObject<boolean>,
  lastLoadedMessage: MutableRefObject<DocumentData | null>,
  isFinishMessages: MutableRefObject<boolean>,
  setGroupedMessages: Dispatch<SetStateAction<GroupedMessages | null>>
) => {
  if (!chatUID || isInfinityScrollLoading.current) {
    return;
  }

  isInfinityScrollLoading.current = true;

  const snapshot = await getMessagesAfterLastLoaded(chatUID, lastLoadedMessage);

  if (!snapshot.empty) {
    const updatedMessages: DocumentData[] = snapshot.docs;
    const lastVisible = updatedMessages[updatedMessages.length - 1];

    if (lastLoadedMessage.current?.id === lastVisible.id) {
      return;
    }

    lastLoadedMessage.current = lastVisible;

    const groupedMessages = groupNewMessages(updatedMessages);
    sortAndMergeScrollNewGroupedMessages(groupedMessages, setGroupedMessages);
  } else {
    isFinishMessages.current = true;
  }
};

export default handleScrollLoadMoreMessages;
