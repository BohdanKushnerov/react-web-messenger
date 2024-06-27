import type { Dispatch, SetStateAction } from 'react';

import type { DocumentChange, DocumentData } from 'firebase/firestore';

import extractDateString from './extractDateString';
import mergeChatMessages from './mergeChatMessages';

import type { GroupedMessages } from 'types/GroupedMessages';

const getFirstChatMessages = (
  change: DocumentChange<DocumentData, DocumentData>,
  setGroupedMessages: Dispatch<SetStateAction<GroupedMessages | null>>
) => {
  const messageData = change.doc.data();
  if (messageData?.date) {
    const dateString = extractDateString(messageData.date);
    const docID = change.doc.id;

    const obj = { [dateString]: [change.doc] };

    setGroupedMessages(prev => {
      if (prev && Object.keys(prev).length !== 0) {
        const prevElId = Object.values(prev)[0][0]?.id;

        if (docID === prevElId) {
          return prev;
        }
      }
      return mergeChatMessages(prev as GroupedMessages, obj);
    });
  }
};

export default getFirstChatMessages;
