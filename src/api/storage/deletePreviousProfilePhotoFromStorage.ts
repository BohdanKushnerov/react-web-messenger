import { deleteObject, ref } from 'firebase/storage';

import { storage } from '@myfirebase/config';

const deletePreviousProfilePhotoFromStorage = async (
  photoURL: string | null
): Promise<void> => {
  if (photoURL) {
    const desertRef = ref(storage, photoURL);
    await deleteObject(desertRef);
  }
};

export default deletePreviousProfilePhotoFromStorage;
