import { Timestamp, addDoc, collection } from 'firebase/firestore';

import { db } from '@myfirebase/config';

import { MessageTypes } from '@enums/messageTypes';

const createAndSaveVoiceMessageDoc = async (
  chatUID: string,
  fileData: Array<{ type: string; name: string; url: string }>,
  currentUserUID: string
): Promise<void> => {
  const additionalMessage = `${String.fromCodePoint(127908)} Voice message`;

  await addDoc(collection(db, `chats/${chatUID}/messages`), {
    type: MessageTypes.VoiceMessage,
    file: fileData,
    fileDescription: additionalMessage,
    message: '',
    senderUserID: currentUserUID,
    date: Timestamp.now(),
    isRead: false,
    isEdited: false,
    isShowNotification: true,
  });
};

export default createAndSaveVoiceMessageDoc;
