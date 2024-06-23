import { Timestamp, addDoc, collection } from 'firebase/firestore';

import { db } from '@myfirebase/config';

import { MessageTypes } from '@enums/messageTypes';

const createAndSaveTextMsgDoc = async (
  chatUID: string,
  message: string,
  currentUserUID: string
): Promise<void> => {
  await addDoc(collection(db, `chats/${chatUID}/messages`), {
    type: MessageTypes.Text,
    message,
    senderUserID: currentUserUID,
    date: Timestamp.now(),
    isRead: false,
    isEdited: false,
    isShowNotification: true,
  });
};

export default createAndSaveTextMsgDoc;
