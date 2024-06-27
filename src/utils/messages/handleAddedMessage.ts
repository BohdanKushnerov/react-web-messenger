import type { Dispatch, SetStateAction } from 'react';

import type { DocumentChange, DocumentData } from 'firebase/firestore';

import extractDateString from './extractDateString';
import mergeChatMessages from './mergeChatMessages';

import type { GroupedMessages } from 'types/GroupedMessages';

const handleAddedMessage = (
  change: DocumentChange<DocumentData, DocumentData>,
  setGroupedMessages: Dispatch<SetStateAction<GroupedMessages | null>>
) => {
  const messageData = change.doc.data();
  if (messageData?.date) {
    const dateString = extractDateString(messageData.date);
    const docID = change.doc.id;

    const obj = { [dateString]: [change.doc] };

    setGroupedMessages(prev => {
      if (prev && Object.values(prev)[0].some(msg => msg.id === docID)) {
        return prev;
      }

      return mergeChatMessages(prev as GroupedMessages, obj);
    });
  }
};

export default handleAddedMessage;
