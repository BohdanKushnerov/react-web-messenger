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
    // isLastMessage: boolean;
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

    // const { selectedMessage, isLastMessage } = editingMessageInfo;
    const { selectedMessage } = editingMessageInfo;

    await Promise.all([
      updateEditedMessageTextContent(chatUID, selectedMessage.id, newMessage),
      updateEditedStatusMsgDoc(chatUID, selectedMessage),
    ]);

    // if (isLastMessage) {
    //   const hasFiles = Boolean(selectedMessage.data().file);
    //   const fileMessage = hasFiles
    //     ? `${String.fromCodePoint(128206)} ${
    //         selectedMessage.data().file.length
    //       } file(s) ${newMessage}`
    //     : newMessage;

    //   await Promise.all([
    //     updateEditedUserChatLastMessage(chatUID, currentUserUID, fileMessage),
    //     updateEditedUserChatLastMessage(chatUID, userUID, fileMessage),
    //   ]);
    // }

    toast.success(t('Toasts.EditingMessageSuccess'));
  } catch (error) {
    toast.error(t('Toasts.EditingMessageError'));
    console.log('handleUpdateEditMessage error', error);
  } finally {
    resetCursorOnDefault();
  }
};

export default handleUpdateEditMessage;
