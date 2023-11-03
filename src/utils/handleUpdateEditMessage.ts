import { db } from '@myfirebase/config';
import { DocumentData, doc, updateDoc } from 'firebase/firestore';

const handleUpdateEditMessage = async (
  editingMessageInfo: {
    selectedMessage: DocumentData;
    isLastMessage: boolean;
  } | null,
  chatUID: string | null,
  newMessage: string,
  currentUserUID: string | null,
  userUID: string | null
) => {
  console.log('handleUpdateEditMessage');
  console.log(editingMessageInfo?.selectedMessage);
  // const editMessageId = editMessage.id;
  if (editingMessageInfo && chatUID) {
    console.log('1 editingMessageInfo && chatUID');
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
      console.log(
        '2222222222222222 editingMessageInfo.isLastMessage && currentUserUID && userUID'
      );
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
    console.log('3333333333 editingMessageInfo?.selectedMessage.data().file');

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
};

export default handleUpdateEditMessage;

// if (editingMessageInfo?.selectedMessage.data().file) {
//   console.log('editingMessageInfo?.selectedMessage.data().file');

// await updateDoc(doc(db, 'userChats', currentUserUID), {
//   [chatUID + '.lastMessage']: `${String.fromCodePoint(128206)} ${
//     editingMessageInfo?.selectedMessage.data().file.length
//   } file(s) ${newMessage}`,
// });

// // =====================================================
// await updateDoc(doc(db, 'userChats', userUID), {
//   [chatUID + '.lastMessage']: `${String.fromCodePoint(128206)} ${
//     editingMessageInfo?.selectedMessage.data().file.length
//   } file(s) ${newMessage}`,
// });
// }
