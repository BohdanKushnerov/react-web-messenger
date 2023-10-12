import { storage } from '@myfirebase/config';
import { ref } from 'firebase/storage';
import { getDownloadURL, uploadBytes } from 'firebase/storage';

const uploadFileToStorage = async (file: File, fileType: string) => {
  const fileBlob = new Blob([file]);
  const uniquePostId = Date.now().toString();
  const storageRef = ref(storage, `${fileType}/${uniquePostId}`);

  const metadata = {
    contentType: fileType,
  };

  await uploadBytes(storageRef, fileBlob, metadata);
  return await getDownloadURL(storageRef);
};

export default uploadFileToStorage;