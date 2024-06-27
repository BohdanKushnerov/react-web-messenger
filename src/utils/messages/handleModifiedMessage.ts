import type { Dispatch, SetStateAction } from 'react';

import type { DocumentChange, DocumentData } from 'firebase/firestore';

import extractDateString from './extractDateString';
import updateGroupedMessages from './updateGroupedMessages';

import type { GroupedMessages } from 'types/GroupedMessages';

const handleModifiedMessage = (
  change: DocumentChange<DocumentData, DocumentData>,
  setGroupedMessages: Dispatch<SetStateAction<GroupedMessages | null>>
) => {
  const messageData = change.doc.data();
  if (messageData?.date) {
    const dateString = extractDateString(messageData.date);

    const doc = change.doc;

    setGroupedMessages(prev => {
      if (prev) {
        return updateGroupedMessages(prev, dateString, doc, 'modify');
      }
      return prev;
    });
  }
};

export default handleModifiedMessage;
