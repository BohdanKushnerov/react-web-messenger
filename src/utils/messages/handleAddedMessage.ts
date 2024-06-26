import { Dispatch, SetStateAction } from 'react';

import { DocumentChange, DocumentData } from 'firebase/firestore';

import extractDateString from './extractDateString';
import mergeChatMessages from './mergeChatMessages';

import { IGroupedMessages } from '@interfaces/IGroupedMessages';

const handleAddedMessage = (
  change: DocumentChange<DocumentData, DocumentData>,
  setGroupedMessages: Dispatch<SetStateAction<IGroupedMessages | null>>
) => {
  const messageData = change.doc.data();
  if (messageData?.date) {
    const dateString = extractDateString(messageData.date);
    const docID = change.doc.id;

    const obj = { [dateString]: [change.doc] };

    setGroupedMessages(prev => {
      if (prev && Object.values(prev)[0].some(msg => msg.id === docID)) {
        return prev;
      } else {
        return mergeChatMessages(prev as IGroupedMessages, obj);
      }
    });
  }
};

export default handleAddedMessage;
