import { storage } from "@myfirebase/config";
import { ref } from "firebase/storage";
import { getDownloadURL, uploadBytes } from "firebase/storage";

const uploadFileToStorage = async (photo: File, url: string) => {
  const file = new Blob([photo]);
  const uniquePostId = Date.now().toString();
  const storageRef = ref(storage, `${url}/${uniquePostId}`);
  
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

export default uploadFileToStorage;