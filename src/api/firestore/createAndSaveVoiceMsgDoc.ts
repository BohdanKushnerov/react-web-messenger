import { addDoc, collection, Timestamp } from 'firebase/firestore';

import { db } from '@myfirebase/config';
import { messageTypes } from '@enums/messageTypes';

const createAndSaveVoiceMsgDoc = async (
  chatUID: string,
  fileData: Array<{ type: string; name: string; url: string }>,
  currentUserUID: string
): Promise<void> => {
  const additionalMsg = `${String.fromCodePoint(127908)} Voice message`;

  await addDoc(collection(db, `chats/${chatUID}/messages`), {
    type: messageTypes.VoiceMessage,
    file: fileData,
    fileDescription: additionalMsg,
    message: '',
    senderUserID: currentUserUID,
    date: Timestamp.now(),
    isRead: false,
    isEdited: false,
    isShowNotification: true,
  });
};

export default createAndSaveVoiceMsgDoc;
