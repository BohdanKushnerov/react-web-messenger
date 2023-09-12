import { db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import { v4 as uuidv4 } from 'uuid';
import {
  DocumentData,
  Timestamp,
  arrayUnion,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import formatTime from './utils/formatTime';
import { Scrollbars } from 'react-custom-scrollbars-2';

export default function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<DocumentData | null>(null);

  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const { chatUID, userInfo } = useChatStore(state => state.currentChatInfo);

  console.log('userInfo', userInfo);

  useEffect(() => {
    if (chatUID === null) return;
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

    if (chatUID === null || currentUserUID === null || userInfo.uid === null) {
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

      // здесь надо переписывать последнее сообщение мне и напарнику
      await updateDoc(doc(db, 'userChats', currentUserUID), {
        [chatUID + '.lastMessage']: message,
        [chatUID + '.date']: serverTimestamp(),
      });
      // =====================================================
      await updateDoc(doc(db, 'userChats', userInfo.uid), {
        [chatUID + '.lastMessage']: message,
        [chatUID + '.date']: serverTimestamp(),
      });
      setMessage('');
    } catch (error) {
      console.log('error handleSendMessage', error);
    }
  };

  return (
    <div className="bg-transparent w-screen">
      {messages && (
        <>
          <div className="flex gap-4 items-center h-12 px-7 border-b bg-myBlackBcg">
            <img
              src={userInfo.photoURL || ''}
              alt={userInfo.photoURL || ''}
              width={40}
              height={40}
            />{' '}
            <p className="text-textSecondary">{userInfo.displayName}</p>
          </div>

          <div className='mx-4'>
            <Scrollbars
              autoHide
              style={{ width: '100%', height: '80vh' }}
            >
              <ul className="flex flex-col gap-2 p-3">
                {messages.map((mes: DocumentData) => {
                  const myUID = currentUserUID === mes.senderUserID;

                  return (
                    <li
                      key={mes.id}
                      className={`py-2 px-4 border ${
                        myUID
                          ? 'place-self-end bg-blue-800'
                          : 'place-self-start bg-green-800'
                      } border-white  rounded-3xl`}
                    >
                      <p className="text-white">{mes.message}</p>
                      <p className="text-white">
                        {mes.date && formatTime(mes.date.toDate().toString())}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </Scrollbars>

            <form
              className="flex items-end gap-4 my-auto p-6 border-t"
              onSubmit={e =>
                handleSendMessage(e, message, chatUID, currentUserUID)
              }
            >
              <input
                className="py-1 px-10 h-12 w-8/12 rounded-3xl bg-mySeacrhBcg text-white"
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
              <button
                className="h-12 w-12 bg-white border rounded-full"
                type="submit"
              >
                Send
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );

}
