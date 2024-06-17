import { toast } from 'react-toastify';

import { DocumentData } from 'firebase/firestore';
import { TFunction } from 'i18next';

import { db } from '@myfirebase/config';

import deleteFilesAndDocsFromStoreAndStorage from '@api/firestore/deleteFilesAndDocsFromStoreAndStorage';

import makeCursorOnProgress from '@utils/makeCursorOnProgress';
import resetCursorOnDefault from '@utils/resetCursorOnDefault';

const handleDeleteMessage = async (
  selectedDocDataMessage: DocumentData[] | null,
  chatUID: string | null,
  currentUserUID: string | null,
  userUID: string | null,
  t: TFunction<'translation', undefined>,
  closeModal: () => void
): Promise<void> => {
  if (!chatUID || !selectedDocDataMessage || !currentUserUID || !userUID) {
    return;
  }

  try {
    makeCursorOnProgress();

    closeModal();

    await deleteFilesAndDocsFromStoreAndStorage(
      selectedDocDataMessage,
      db,
      chatUID
    );

    toast.success(t('Toasts.DeleteMessageSuccess'));
  } catch (error) {
    toast.error(t('Toasts.DeleteMessageError'));
    console.log('handleDeleteMessage error', error);
  } finally {
    resetCursorOnDefault();
  }
};

export default handleDeleteMessage;
