import { DocumentData, doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { TFunction } from 'i18next';

import { db } from '@myfirebase/config';

const handleUpdateEditMessage = async (
  editingMessageInfo: {
    selectedMessage: DocumentData;
    isLastMessage: boolean;
  } | null,
  chatUID: string | null,
  newMessage: string,
  currentUserUID: string | null,
  userUID: string | null,
  t: TFunction
) => {
  // const editMessageId = editMessage.id;
  if (editingMessageInfo && chatUID) {
    await updateDoc(
      doc(
        db,
        'chats',
        chatUID,
        'messages',
        editingMessageInfo.selectedMessage.id
      ),
      {
        ['message']: newMessage,
      }
    );

    if (
      editingMessageInfo.isLastMessage &&
      currentUserUID &&
      userUID &&
      !editingMessageInfo?.selectedMessage.data().file
    ) {
      // здесь надо переписывать последнее сообщение мне и напарнику
      await updateDoc(doc(db, 'userChats', currentUserUID), {
        [chatUID + '.lastMessage']: newMessage,
      });

      // =====================================================
      await updateDoc(doc(db, 'userChats', userUID), {
        [chatUID + '.lastMessage']: newMessage,
      });
    }
  }

  if (
    editingMessageInfo?.isLastMessage &&
    currentUserUID &&
    userUID &&
    editingMessageInfo?.selectedMessage.data().file
  ) {
    await updateDoc(doc(db, 'userChats', currentUserUID), {
      [chatUID + '.lastMessage']: `${String.fromCodePoint(128206)} ${
        editingMessageInfo?.selectedMessage.data().file.length
      } file(s) ${newMessage}`,
    });

    // =====================================================
    await updateDoc(doc(db, 'userChats', userUID), {
      [chatUID + '.lastMessage']: `${String.fromCodePoint(128206)} ${
        editingMessageInfo?.selectedMessage.data().file.length
      } file(s) ${newMessage}`,
    });
  }

  toast.success(t('Toasts.EditingMessageSuccess'));
};

export default handleUpdateEditMessage;