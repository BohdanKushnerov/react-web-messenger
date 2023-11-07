import { ref } from 'firebase/storage';
import { getDownloadURL, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

import { storage } from '@myfirebase/config';


const uploadFileToStorage = async (
  fileBlob: Blob,
  fileType: string,
  name: string,
  userUID: string,
) => {
  // const storageRef = ref(storage, `${fileType}/${userUID}/${name}`);
  const storageRef = ref(storage, `${fileType}/${userUID}/${uuidv4()}-${name}`);

  const metadata = {
    contentType: fileType,
  };

  await uploadBytes(storageRef, fileBlob, metadata);
  return await getDownloadURL(storageRef);
};

export default uploadFileToStorage;