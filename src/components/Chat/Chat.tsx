import { db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import { v4 as uuidv4 } from 'uuid';
import { DocumentData, Timestamp, arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<DocumentData | null>(null);
  const chatUID = useChatStore(state => state.chatUID);
  const currentUserUID = useChatStore(state => state.currentUser.uid);

  console.log('messages', messages);

  useEffect(() => {
    if(chatUID === null) return
    const unSub = onSnapshot(
      doc(db, 'chats', chatUID),
      doc => doc.exists() && setMessages(doc.data().messages)
    );

    return () => {
      unSub();
    };
  }, [chatUID]);

  const handleSendMessage = async (
    e: React.FormEvent,
    message: string,
    chatUID: string | null,
    currentUserUID: string | null
  ) => {
    e.preventDefault();

    if (chatUID === null || currentUserUID === null) {
      // Обработка случая, когда chatUID равен null
      return;
    }

    try {
      await updateDoc(doc(db, 'chats', chatUID), {
        messages: arrayUnion({
          id: uuidv4(),
          message,
          senderUserID: currentUserUID,
          date: Timestamp.now(),
        }),
      });
    } catch (error) {
      console.log('error handleSendMessage', error);
    }
  };

  return (
    <div className="bg-blue-100 w-full">
      <ul>
        {messages &&
          messages.map((mes: DocumentData) => {
            console.log('mes', mes);

            return (
              <li key={mes.id}>
                <p>{mes.message}</p>
                <p>{mes.date && mes.date.toDate().toString()}</p>
              </li>
            );
          })}
      </ul>
      <form
        onSubmit={e => handleSendMessage(e, message, chatUID, currentUserUID)}
      >
        <input
          className="py-1 px-10 h-10 w-60 rounded-3xl bg-mySeacrhBcg text-white"
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button type="submit">Send message</button>
      </form>
    </div>
  );
}
