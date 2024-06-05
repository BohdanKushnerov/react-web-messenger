import { DocumentData } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { TFunction } from 'i18next';

// import updateEditedUserChatLastMessage from '@api/firestore/updateEditedUserChatLastMessage';
import updateEditedMessageTextContent from '@api/firestore/updateEditedMessageTextContent';
import makeCursorOnProgress from '@utils/makeCursorOnProgress';
import resetCursorOnDefault from '@utils/resetCursorOnDefault';
import updateEditedStatusMsgDoc from '@api/firestore/updateEditedStatusMsgDoc';

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
