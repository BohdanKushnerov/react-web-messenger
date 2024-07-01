import { doc, updateDoc } from 'firebase/firestore';
import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

import { db } from '@myfirebase/config';

const updateDocStopNotifyForCurrentMessage = async (
  msg: QueryDocumentSnapshot<DocumentData, DocumentData>,
  chatUID: string | null
) => {
  if (msg.data().isShowNotification && chatUID) {
    await updateDoc(doc(db, 'chats', chatUID, 'messages', `${msg.id}`), {
      isShowNotification: false,
    });
  }
};

export default updateDocStopNotifyForCurrentMessage;
