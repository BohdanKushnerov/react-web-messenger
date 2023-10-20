import { db } from "@myfirebase/config";
import { DocumentData, doc, updateDoc } from "firebase/firestore";

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

    if (editingMessageInfo.isLastMessage && currentUserUID && userUID) {
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
};

export default handleUpdateEditMessage;