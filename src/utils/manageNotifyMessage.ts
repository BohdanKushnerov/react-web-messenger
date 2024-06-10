import { MutableRefObject } from 'react';
import {
  doc,
  DocumentData,
  QueryDocumentSnapshot,
  updateDoc,
} from 'firebase/firestore';

import { db } from '@myfirebase/config';
import makeNotification from '@utils/messages/makeNotification';

const manageNotifyMessage = async (
  msg: QueryDocumentSnapshot<DocumentData, DocumentData>,
  chatUID: string | null,
  processedMessages: MutableRefObject<string[]>
) => {
  if (msg.data().isShowNotification && chatUID) {
    await updateDoc(doc(db, 'chats', chatUID, 'messages', `${msg.id}`), {
      ['isShowNotification']: false,
    });

    if (processedMessages.current.includes(msg.id)) {
      return;
    }

    processedMessages.current.push(msg.id);

    makeNotification(msg);
  }
};

export default manageNotifyMessage;
