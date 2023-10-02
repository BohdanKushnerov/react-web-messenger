import { Timestamp, addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

import { db } from "@myfirebase/config";

const handleSendMessage = async (
  message: string,
  chatUID: string | null,
  currentUserUID: string | null,
  userUID: string | null
) => {
  if (chatUID === null || currentUserUID === null || userUID === null) {
    // Обработка случая, когда chatUID равен null
    return;
  }

  try {
    // создаем сообщение в виде обьекта и отправляем в подколекцию фаербейз
    await addDoc(collection(db, `chats/${chatUID}/messages`), {
      uid: uuidv4(),
      message,
      senderUserID: currentUserUID,
      date: Timestamp.now(),
      isRead: false,
    });

    // здесь надо переписывать последнее сообщение мне и напарнику
    await updateDoc(doc(db, 'userChats', currentUserUID), {
      [chatUID + '.lastMessage']: message,
      [chatUID + '.date']: serverTimestamp(),
    });

    // =====================================================
    await updateDoc(doc(db, 'userChats', userUID), {
      [chatUID + '.lastMessage']: message,
      [chatUID + '.date']: serverTimestamp(),
    });
  } catch (error) {
    console.log('error handleSendMessage', error);
  }
};

export default handleSendMessage;
