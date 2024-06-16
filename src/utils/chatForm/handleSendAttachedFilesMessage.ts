import { Dispatch, ForwardedRef, SetStateAction } from 'react';

import {
  UploadTaskSnapshot,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

import { storage } from '@myfirebase/config';

import createAndSaveAttachhedFilesMsgDoc from '@api/firestore/createAndSaveAttachhedFilesMsgDoc';

import { IFile } from '@interfaces/IFile';

import { FilesUploadStatuses } from 'types/FilesUploadStatuses';

const uploadFile = (
  file: File,
  userUID: string | null,
  setUploadFilesStatus: Dispatch<SetStateAction<FilesUploadStatuses>>
): Promise<IFile> => {
  return new Promise((resolve, reject) => {
    const metadata = { contentType: file.type };
    const storageRef = ref(
      storage,
      `${file.type}/${userUID}/${uuidv4()}-${file.name}`
    );
    const fileBlob = new Blob([file]);
    const uploadTask = uploadBytesResumable(storageRef, fileBlob, metadata);

    uploadTask.on(
      'state_changed',
      snapshot => uploadProgress(snapshot, file.name, setUploadFilesStatus),
      error => reject(new Error(`Error uploadTask.on: ${error.message}`)),
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const fileDetails = await getFileDetails(file, fileBlob, downloadURL);
          resolve(fileDetails);
        } catch (error: unknown) {
          if (error instanceof Error) {
            reject(
              new Error(
                `Failed to get download URL and fileDetails: ${error.message}`
              )
            );
          } else {
            reject(
              new Error(
                'Failed to get download URL and fileDetails: An unknown error occurred'
              )
            );
          }
        }
      }
    );
  });
};

const uploadProgress = (
  snapshot: UploadTaskSnapshot,
  fileName: string,
  setUploadFilesStatus: Dispatch<SetStateAction<FilesUploadStatuses>>
) => {
  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  setUploadFilesStatus(prev => ({
    ...prev,
    [fileName]: progress,
  }));
};

const getFileDetails = (
  file: File,
  fileBlob: Blob,
  downloadURL: string
): Promise<IFile> => {
  return new Promise((resolve, reject) => {
    if (file.type.includes('image')) {
      const image = new Image();
      image.src = URL.createObjectURL(fileBlob);

      image.onload = () => {
        resolve({
          type: file.type,
          name: file.name,
          url: downloadURL,
          width: image.width,
          height: image.height,
        });
      };
      image.onerror = reject;
    } else {
      resolve({
        type: file.type,
        name: file.name,
        url: downloadURL,
      });
    }
  });
};

const handleSendAttachedFilesMessage = async (
  fileInputRef: ForwardedRef<HTMLInputElement>,
  currentUserUID: string | null,
  userUID: string | null,
  chatUID: string | null,
  setUploadFilesStatus: Dispatch<SetStateAction<FilesUploadStatuses>>,
  fileDescriptionUser: string,
  handleCloseFileModal: () => void
): Promise<void> => {
  if (
    fileInputRef &&
    'current' in fileInputRef &&
    fileInputRef.current?.files &&
    currentUserUID
  ) {
    try {
      const promiseArrayURLsOfFiles = Array.from(
        fileInputRef.current.files
      ).map(file => uploadFile(file, userUID, setUploadFilesStatus));
      const filesArr: IFile[] = await Promise.all(promiseArrayURLsOfFiles);

      await createAndSaveAttachhedFilesMsgDoc(
        filesArr,
        currentUserUID,
        chatUID,
        fileDescriptionUser
      );
    } catch (error) {
      console.error('error handleSendFilesToStorage', error);
    }
    setUploadFilesStatus({});
    handleCloseFileModal();
  }
};

export default handleSendAttachedFilesMessage;
