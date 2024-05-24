import { addDoc, collection, Timestamp } from 'firebase/firestore';

import { db } from '@myfirebase/config';

const createAndSaveTextMsgDoc = async (
  chatUID: string,
  message: string,
  currentUserUID: string
): Promise<void> => {
  await addDoc(collection(db, `chats/${chatUID}/messages`), {
    message,
    senderUserID: currentUserUID,
    date: Timestamp.now(),
    isRead: false,
    isShowNotification: true,
  });
};

export default createAndSaveTextMsgDoc;
