import { useEffect, useState, useRef } from 'react';
import {
  DocumentData,
  Firestore,
  Timestamp,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  addDoc,
} from 'firebase/firestore';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { v4 as uuidv4 } from 'uuid';

import { db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import formatTime from './utils/formatTime';

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<DocumentData[] | null>(null);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const { chatUID, userInfo } = useChatStore(state => state.currentChatInfo);

  const scrollbarsRef = useRef<Scrollbars>(null);

  useEffect(() => {
    if (chatUID === null) return;

    const q = query(
      collection(db, `chats/${chatUID}/messages`),
      orderBy('date', 'asc')
      // orderBy('date', 'desc')
    );

    onSnapshot(q, snapshot => {
        // if (!snapshot.empty) {
        //   if(!messages) {
        //     console.log('1111111111111111111111111111111111111111111111')
        //     setMessages(snapshot.docs);
        //   }
        // }
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          console.log('New mes: ', change.doc.data());
          // if(messages) {
          //   setMessages([change.doc]);
          // } else {
          //   setMessages(prev => [...prev, change.doc]);
          // }
        }
        if (change.type === 'modified') {
          console.log('Modified mes: ', change.doc.data());
        }
        if (change.type === 'removed') {
          console.log('Removed mes: ', change.doc.data());
        }
      });
    });

    const unSub = onSnapshot(q, querySnapshot => {
      if (!querySnapshot.empty) {
        setMessages(querySnapshot.docs);
      }
    });

    return () => {
      unSub();
    };
  }, [chatUID, currentUserUID]);

  useEffect(() => {
    handleClickScrollBottom();
  }, [messages]);

  const handleSendMessage = async (
    e: React.FormEvent,
    message: string,
    chatUID: string | null,
    currentUserUID: string | null,
    userUID: string | null
  ) => {
    e.preventDefault();

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
      updateDoc(doc(db, 'userChats', currentUserUID), {
        [chatUID + '.lastMessage']: message,
        [chatUID + '.date']: serverTimestamp(),
      });

      // =====================================================
      updateDoc(doc(db, 'userChats', userUID), {
        [chatUID + '.lastMessage']: message,
        [chatUID + '.date']: serverTimestamp(),
      });

      setMessage('');
    } catch (error) {
      console.log('error handleSendMessage', error);
    }
  };

  const handleClickScrollBottom = () => {
    if (scrollbarsRef.current) {
      scrollbarsRef.current.scrollToBottom();
    }
  };

  // надо тротл добавить чтобі не так часто срабатывало
  const handleScroll = () => {
    const scrollHeight = scrollbarsRef.current?.getScrollHeight() || 0;
    const clientHeight = scrollbarsRef.current?.getClientHeight() || 0;
    const scrollTop = scrollbarsRef.current?.getScrollTop() || 0;

    const isNearBottom = scrollHeight - scrollTop - clientHeight > 100;

    setIsButtonVisible(isNearBottom);
  };

  const makeReadMes = async (
    db: Firestore,
    chatUID: string,
    mesUID: string
  ) => {
    if (chatUID === null) {
      // Обработка случая, когда chatUID равен null
      return;
    }

    updateDoc(doc(db, 'chats', chatUID, 'messages', `${mesUID}`), {
      ['isRead']: true,
    });
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

          <div className="mx-4">
            <Scrollbars
              ref={scrollbarsRef}
              autoHide
              style={{ width: '100%', height: '80vh' }}
              onScroll={handleScroll}
            >
              <ul className="flex flex-col gap-2 p-3">
                {messages.map(mes => {
                  // console.log(mes)
                  const myUID = currentUserUID === mes.data().senderUserID;
                  // console.log('mes', mes);

                  if (
                    mes.data().senderUserID !== currentUserUID &&
                    !mes.data().isRead &&
                    chatUID
                  ) {
                    makeReadMes(db, chatUID, mes.id);
                  }

                  return (
                    <li
                      key={mes.id}
                      className={`py-2 px-4 border ${
                        myUID
                          ? 'place-self-end bg-blue-800'
                          : 'place-self-start bg-green-800'
                      } border-white  rounded-3xl`}
                    >
                      <p className="text-white">{mes.data().message}</p>
                      <p className="text-white">
                        {mes.data().date &&
                          formatTime(mes.data().date.toDate().toString())}
                      </p>
                      <p>
                        {mes.data().isRead ? (
                          <svg
                            width="30px"
                            height="30px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4 12.9L7.14286 16.5L15 7.5"
                              stroke="#FFFFFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M20 7.5625L11.4283 16.5625L11 16"
                              stroke="#FFFFFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="30px"
                            height="30px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7 12.9L10.1429 16.5L18 7.5"
                              stroke="#FFFFFF"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </Scrollbars>

            {isButtonVisible && (
              <button
                onClick={handleClickScrollBottom}
                className="fixed bottom-32 right-4 bg-white p-2 rounded-full"
              >
                <svg
                  className="rotate-180"
                  strokeWidth="0"
                  viewBox="0 0 320 512"
                  height="24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"></path>
                </svg>
              </button>
            )}

            <form
              className="flex items-end gap-4 my-auto p-6 border-t"
              onSubmit={e =>
                handleSendMessage(
                  e,
                  message,
                  chatUID,
                  currentUserUID,
                  userInfo.uid
                )
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

export default Chat;
