import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '@myfirebase/config';
import { createAndSaveFileMsgDoc } from '@api/firestore/createAndSaveFileMsgDoc';

const uploadAudioToStorage = async (
  audioBlob: Blob,
  userUID: string
): Promise<string> => {
  const metadata = {
    contentType: 'audio/webm',
  };

  const storageRef = ref(storage, `audio/webm/${userUID}/${uuidv4()}.webm`);
  await uploadBytes(storageRef, audioBlob, metadata);
  const downloadURL = await getDownloadURL(storageRef);

  return downloadURL;
};

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
    const downloadURL = await uploadAudioToStorage(audioBlob, userUID);

    const fileArr = [
      {
        type: 'audio/webm',
        name: 'voice audio',
        url: downloadURL,
      },
    ];

    await createAndSaveFileMsgDoc(chatUID, fileArr, currentUserUID);
    await updateUserChats(chatUID, userUID, currentUserUID);
  } catch (error) {
    console.error('Error sending audio message:', error);
  }
};

export default handleSendAudio;
