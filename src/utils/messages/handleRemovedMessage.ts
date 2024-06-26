import { Dispatch, SetStateAction } from 'react';

import { DocumentChange, DocumentData } from 'firebase/firestore';

import extractDateString from './extractDateString';
import updateGroupedMessages from './updateGroupedMessages';

import { IGroupedMessages } from '@interfaces/IGroupedMessages';

const handleRemovedMessage = (
  change: DocumentChange<DocumentData, DocumentData>,
  setGroupedMessages: Dispatch<SetStateAction<IGroupedMessages | null>>
) => {
  const messageData = change.doc.data();
  if (messageData?.date) {
    const dateString = extractDateString(messageData.date);

    setGroupedMessages(prev => {
      if (prev) {
        return updateGroupedMessages(prev, dateString, change.doc, 'remove');
      }
      return prev;
    });
  }
};

export default handleRemovedMessage;
