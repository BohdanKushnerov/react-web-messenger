import { DocumentData } from 'firebase/firestore';
import { TFunction } from 'i18next';
import { toast } from 'react-toastify';

import { db } from '@myfirebase/config';
import deleteFilesAndDocsFromStoreAndStorage from '@api/firestore/deleteFilesAndDocsFromStoreAndStorage';
import getLastMessage from '@api/firestore/getLastMessage';
import updateUserChatLastMessage from '@api/firestore/updateUserChatLastMessage';
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

    await deleteFilesAndDocsFromStoreAndStorage(
      selectedDocDataMessage,
      db,
      chatUID
    );

    closeModal();

    const lastFirestoreMessage = await getLastMessage(chatUID, db);

    let lastMessage = ' ';
    let senderUserID = ' ';
    let lastDate = ' ';

    if (lastFirestoreMessage) {
      const lastFiles = lastFirestoreMessage.file;
      lastMessage = lastFiles
        ? `${String.fromCodePoint(128206)} ${lastFiles.length} file(s) ${
            lastFirestoreMessage.message
          }`
        : lastFirestoreMessage.message;
      senderUserID = lastFirestoreMessage.senderUserID;
      lastDate = lastFirestoreMessage.date;
    }

    await Promise.all([
      updateUserChatLastMessage(
        chatUID,
        currentUserUID,
        lastMessage,
        senderUserID,
        lastDate
      ),
      updateUserChatLastMessage(
        chatUID,
        userUID,
        lastMessage,
        senderUserID,
        lastDate
      ),
    ]);

    const inputElement = document.getElementById('chatFormInput');
    inputElement?.focus();

    toast.success(t('Toasts.DeleteMessageSuccess'));
  } catch (error) {
    toast.error(t('Toasts.DeleteMessageError'));
    console.log('handleDeleteMessage error', error);
  } finally {
    resetCursorOnDefault();
  }
};

export default handleDeleteMessage;
