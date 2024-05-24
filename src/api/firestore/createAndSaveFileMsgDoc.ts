import { addDoc, collection, Timestamp } from 'firebase/firestore';

import { db } from '@myfirebase/config';

const createAndSaveFileMsgDoc = async (
  chatUID: string,
  fileArr: Array<{ type: string; name: string; url: string }>,
  currentUserUID: string
): Promise<void> => {
  const fileDescription = '';

  await addDoc(collection(db, `chats/${chatUID}/messages`), {
    file: fileArr,
    message: fileDescription,
    senderUserID: currentUserUID,
    date: Timestamp.now(),
    isRead: false,
    isShowNotification: true,
  });
};

export default createAndSaveFileMsgDoc;
