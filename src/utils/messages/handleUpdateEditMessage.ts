import { toast } from 'react-toastify';

import { DocumentData } from 'firebase/firestore';
import { TFunction } from 'i18next';

import updateEditedMessageTextContent from '@api/firestore/updateEditedMessageTextContent';
import updateEditedStatusMsgDoc from '@api/firestore/updateEditedStatusMsgDoc';

import makeCursorOnProgress from '@utils/makeCursorOnProgress';
import resetCursorOnDefault from '@utils/resetCursorOnDefault';

const handleUpdateEditMessage = async (
  editingMessageInfo: {
    selectedMessage: DocumentData;
  } | null,
  chatUID: string | null,
  newMessage: string,
  currentUserUID: string | null,
  userUID: string | null,
  t: TFunction
): Promise<void> => {
  if (!editingMessageInfo || !chatUID || !currentUserUID || !userUID) {
    return;
  }

  try {
    makeCursorOnProgress();

    const { selectedMessage } = editingMessageInfo;

    await Promise.all([
      updateEditedMessageTextContent(chatUID, selectedMessage.id, newMessage),
      updateEditedStatusMsgDoc(chatUID, selectedMessage),
    ]);

    toast.success(t('Toasts.EditingMessageSuccess'));
  } catch (error) {
    toast.error(t('Toasts.EditingMessageError'));
    console.log('handleUpdateEditMessage error', error);
  } finally {
    resetCursorOnDefault();
  }
};

export default handleUpdateEditMessage;
