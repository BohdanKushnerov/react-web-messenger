import { Dispatch, RefObject, SetStateAction } from 'react';
import { toast } from 'react-toastify';

import { User } from 'firebase/auth';
import { TFunction } from 'i18next';

import { auth } from '@myfirebase/config';

import updateUserProfile from '@api/firestore/updateUserProfile';
import deletePreviousProfilePhotoFromStorage from '@api/storage/deletePreviousProfilePhotoFromStorage';
import uploadProfilePhotoFile from '@api/storage/uploadProfilePhotoFile';

const handleUpdateProfilePhoto = async (
  photoProfileInputRef: RefObject<HTMLInputElement>,
  currentUserUID: string | null,
  setProfilePhotoUploadStatus: Dispatch<SetStateAction<number | null>>,
  t: TFunction<'translation', 'ProfileSettings'>,
  photoURL: string | null,
  updateCurrentUser: (user: User | null) => void,
  handleToggleProfilePhotoModal: () => void
): Promise<void> => {
  if (
    !photoProfileInputRef.current?.files ||
    !auth.currentUser ||
    !currentUserUID
  ) {
    return;
  }

  const file = photoProfileInputRef.current.files[0];

  if (file) {
    try {
      const newPhotoURL = await uploadProfilePhotoFile(
        file,
        currentUserUID,
        setProfilePhotoUploadStatus
      );

      await deletePreviousProfilePhotoFromStorage(photoURL);

      await updateUserProfile(
        auth.currentUser,
        newPhotoURL,
        currentUserUID,
        updateCurrentUser
      );

      handleToggleProfilePhotoModal();
      setProfilePhotoUploadStatus(null);

      toast.success(t('ChangePhotoToastSuccess'));
    } catch (error) {
      toast.error(t('ChangePhotoToastError'));
      console.error('Error updating profile photo:', error);
    }
  }
};

export default handleUpdateProfilePhoto;
