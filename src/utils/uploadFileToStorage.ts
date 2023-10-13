import { storage } from '@myfirebase/config';
import { ref } from 'firebase/storage';
import { getDownloadURL, uploadBytes } from 'firebase/storage';

const uploadFileToStorage = async (
  fileBlob: Blob,
  fileType: string,
  name: string
) => {
  // const fileBlob = new Blob([file]);
  // const imageUrl = URL.createObjectURL(fileBlob);
  // const uniquePostId = Date.now().toString();
  const storageRef = ref(storage, `${fileType}/${name}`);

  const metadata = {
    contentType: fileType,
  };

  await uploadBytes(storageRef, fileBlob, metadata);
  return await getDownloadURL(storageRef);
};

export default uploadFileToStorage;