import { doc, updateDoc } from 'firebase/firestore';
import { User, updateProfile } from 'firebase/auth';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

import { auth, db, storage } from '@myfirebase/config';
import { toast } from 'react-toastify';
import { Dispatch, RefObject, SetStateAction } from 'react';
import { TFunction } from 'i18next';

export const handleUpdateProfilePhoto = async (
  photoProfileInputRef: RefObject<HTMLInputElement>,
  currentUserUID: string | null,
  setProfilePhotoUploadStatus: Dispatch<SetStateAction<number | null>>,
  t: TFunction<'translation', 'ProfileSettings'>,
  photoURL: string | null,
  updateCurrentUser: (user: User | null) => void,
  handleToggleProfilePhotoModal: () => void
) => {
  if (
    photoProfileInputRef.current?.files &&
    auth.currentUser &&
    currentUserUID
  ) {
    const file = photoProfileInputRef.current.files[0];

    if (file) {
      try {
        const metadata = {
          contentType: file.type,
        };

        const storageRef = ref(
          storage,
          `${file.type}/${currentUserUID}/${uuidv4()}-${file.name}`
        );

        const fileBlob = new Blob([file]);

        const uploadTask = uploadBytesResumable(storageRef, fileBlob, metadata);

        const profilePhotoUrlFromStorage: string = await new Promise(
          (resolve, reject) => {
            uploadTask.on(
              'state_changed',
              snapshot => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                setProfilePhotoUploadStatus(progress);
              },
              error => {
                console.log('error', error);
              },
              async () => {
                try {
                  const downloadURL = await getDownloadURL(
                    uploadTask.snapshot.ref
                  );

                  resolve(downloadURL);
                  toast.success(t('ChangePhotoToast'));
                } catch (error) {
                  // console.log(
                  //   'profilePhotoUrlFromStorage',
                  //   profilePhotoUrlFromStorage
                  // );
                  console.log('profilePhotoUrlFromStorage error', error);
                  reject(error);
                }
              }
            );
          }
        );

        if (photoURL) {
          const desertRef = ref(storage, photoURL);

          await deleteObject(desertRef);
        }

        await updateProfile(auth.currentUser, {
          photoURL: profilePhotoUrlFromStorage,
        })
          .then(() => {
            updateCurrentUser(auth.currentUser);
          })
          .catch(error => {
            console.log('handleUpdateProfilePhoto error', error);
            // An error occurred
          });

        // update doc user чтобы появилась ссылка в photoURL
        await updateDoc(doc(db, 'users', currentUserUID), {
          photoURL: profilePhotoUrlFromStorage,
        });

        handleToggleProfilePhotoModal();
        setProfilePhotoUploadStatus(null);
      } catch (error) {
        console.log('handleUpdateProfilePhoto error', error);
      }
    }
  }
};
