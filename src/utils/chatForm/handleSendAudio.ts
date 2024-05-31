import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';

import { db } from '@myfirebase/config';
import createAndSaveFileMsgDoc from '@api/firestore/createAndSaveFileMsgDoc';
import uploadAudioToStorage from '@api/storage/uploadAudioToStorage';
import makeCursorOnProgress from '@utils/makeCursorOnProgress';
import resetCursorOnDefault from '@utils/resetCursorOnDefault';

const updateUserChats = async (
  chatUID: string,
  userUID: string,
  currentUserUID: string
): Promise<void> => {
  await updateDoc(doc(db, 'userChats', currentUserUID), {
    [`${chatUID}.lastMessage`]: `${String.fromCodePoint(127908)} Voice message`,
    [`${chatUID}.senderUserID`]: currentUserUID,
    [`${chatUID}.date`]: serverTimestamp(),
  });

  await updateDoc(doc(db, 'userChats', userUID), {
    [`${chatUID}.lastMessage`]: `${String.fromCodePoint(127908)} Voice message`,
    [`${chatUID}.senderUserID`]: currentUserUID,
    [`${chatUID}.date`]: serverTimestamp(),
  });
};

const handleSendAudio = async (
  audioBlob: Blob,
  chatUID: string,
  userUID: string,
  currentUserUID: string
): Promise<void> => {
  try {
    makeCursorOnProgress();
    const downloadURL = await uploadAudioToStorage(audioBlob, userUID);

    const fileArr = [
      {
        type: 'audio/webm',
        name: 'voice audio',
        url: downloadURL,
      },
    ];

    await createAndSaveFileMsgDoc(chatUID, fileArr, currentUserUID);
    resetCursorOnDefault();
    await updateUserChats(chatUID, userUID, currentUserUID);
  } catch (error) {
    console.error('Error sending audio message:', error);
  }
};

export default handleSendAudio;
