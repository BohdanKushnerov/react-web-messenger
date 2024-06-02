import { addDoc, collection, Timestamp } from 'firebase/firestore';

import { db } from '@myfirebase/config';
import { messageTypes } from '@enums/messageTypes';

const createAndSaveTextMsgDoc = async (
  chatUID: string,
  message: string,
  currentUserUID: string
): Promise<void> => {
  await addDoc(collection(db, `chats/${chatUID}/messages`), {
    type: messageTypes.Text,
    message,
    senderUserID: currentUserUID,
    date: Timestamp.now(),
    isEdited: false,
    isRead: false,
    isShowNotification: true,
  });
};

export default createAndSaveTextMsgDoc;
