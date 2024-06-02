import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

import { storage } from '@myfirebase/config';

const uploadAudioToStorage = async (
  audioBlob: Blob,
  userUID: string
): Promise<string> => {
  const format = 'mpeg';

  const metadata = {
    contentType: `audio/${format}`,
  };

  const storageRef = ref(
    storage,
    `${metadata.contentType}/${userUID}/${uuidv4()}.${format}`
  );
  await uploadBytes(storageRef, audioBlob, metadata);
  const downloadURL = await getDownloadURL(storageRef);

  return downloadURL;
};

export default uploadAudioToStorage;
