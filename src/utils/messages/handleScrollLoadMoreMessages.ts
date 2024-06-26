import { Dispatch, MutableRefObject, SetStateAction } from 'react';

import { DocumentData } from 'firebase/firestore';

import groupNewMsgs from './groupNewMsgs';
import sortAndMergeScrollNewGroupedMessages from './sortAndMergeScrollNewGroupedMessages';

import getMessagesAfterLastLoaded from '@api/firestore/getMessagesAfterLastLoaded';

import { IGroupedMessages } from '@interfaces/IGroupedMessages';

const handleScrollLoadMoreMessages = async (
  chatUID: string | null,
  isInfinityScrollLoading: MutableRefObject<boolean>,
  lastLoadedMsg: MutableRefObject<DocumentData | null>,
  isFinishMsgs: MutableRefObject<boolean>,
  setGroupedMessages: Dispatch<SetStateAction<IGroupedMessages | null>>
) => {
  if (!chatUID || isInfinityScrollLoading.current) {
    return;
  }

  isInfinityScrollLoading.current = true;

  const snapshot = await getMessagesAfterLastLoaded(chatUID, lastLoadedMsg);

  if (!snapshot.empty) {
    const updatedMessages: DocumentData[] = snapshot.docs;
    const lastVisible = updatedMessages[updatedMessages.length - 1];

    if (lastLoadedMsg.current?.id === lastVisible.id) {
      return;
    }

    lastLoadedMsg.current = lastVisible;

    const groupedMsgs = groupNewMsgs(updatedMessages);
    sortAndMergeScrollNewGroupedMessages(groupedMsgs, setGroupedMessages);
  } else {
    isFinishMsgs.current = true;
  }
};

export default handleScrollLoadMoreMessages;
