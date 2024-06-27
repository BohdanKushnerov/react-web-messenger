import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

import type { GroupedMessages } from 'types/GroupedMessages';
import type { UpdateTypeMessages } from 'types/UpdateTypeMessages';

const updateGroupedMessages = (
  prev: GroupedMessages,
  dateString: string,
  doc: QueryDocumentSnapshot<DocumentData, DocumentData>,
  updateType: UpdateTypeMessages
) => {
  const updatedMessages = { ...prev };

  if (updateType === 'add') {
    if (updatedMessages[dateString]) {
      updatedMessages[dateString].push(doc);
    } else {
      updatedMessages[dateString] = [doc];
    }
  } else if (updateType === 'modify') {
    const index = updatedMessages[dateString].findIndex(
      item => item.id === doc.id
    );

    if (index !== -1) {
      updatedMessages[dateString] = [
        ...updatedMessages[dateString].slice(0, index),
        doc,
        ...updatedMessages[dateString].slice(index + 1),
      ];
    }
  } else if (updateType === 'remove') {
    updatedMessages[dateString] = updatedMessages[dateString].filter(
      item => item.id !== doc.id
    );

    if (updatedMessages[dateString].length === 0) {
      delete updatedMessages[dateString];
    }
  }

  return updatedMessages;
};

export default updateGroupedMessages;
