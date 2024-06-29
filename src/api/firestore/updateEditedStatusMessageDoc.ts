import { type DocumentData, doc, updateDoc } from 'firebase/firestore';

import { db } from '@myfirebase/config';

const updateEditedStatusMessageDoc = async (
  chatUID: string,
  selectedMessage: DocumentData
): Promise<void> => {
  await updateDoc(
    doc(db, 'chats', chatUID, 'messages', `${selectedMessage.id}`),
    {
      isEdited: true,
    }
  );
};

export default updateEditedStatusMessageDoc;
