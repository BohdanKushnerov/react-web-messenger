import { Dispatch, SetStateAction } from 'react';

import {
  UploadTaskSnapshot,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

import { storage } from '@myfirebase/config';

const uploadProfilePhotoFile = async (
  file: File,
  currentUserUID: string,
  setProfilePhotoUploadStatus: Dispatch<SetStateAction<number | null>>
): Promise<string> => {
  const metadata = {
    contentType: file.type,
  };

  const storageRef = ref(
    storage,
    `${file.type}/${currentUserUID}/${uuidv4()}-${file.name}`
  );

  const fileBlob = new Blob([file]);

  const uploadTask = uploadBytesResumable(storageRef, fileBlob, metadata);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot: UploadTaskSnapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProfilePhotoUploadStatus(progress);
      },
      error => {
        reject(new Error(`Error uploading file: ${error.message}`));
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error: unknown) {
          if (error instanceof Error) {
            reject(new Error(`Failed to get download URL: ${error.message}`));
          } else {
            reject(
              new Error('Failed to get download URL: An unknown error occurred')
            );
          }
        }
      }
    );
  });
};

export default uploadProfilePhotoFile;
