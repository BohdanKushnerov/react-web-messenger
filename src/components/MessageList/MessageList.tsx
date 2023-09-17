import { useEffect, useState, useRef } from 'react';
import {
  DocumentData,
  Firestore,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { Scrollbars } from 'react-custom-scrollbars-2';

import { db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import formatTime from '@components/Chat/utils/formatTime';

interface iMessageListProps {
  messages: DocumentData[] | null;
}

function MessageList({ messages }: iMessageListProps) {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const scrollbarsRef = useRef<Scrollbars>(null);

  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const { chatUID } = useChatStore(state => state.currentChatInfo);

  useEffect(() => {
    handleClickScrollBottom();
  }, [messages]);

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
    <>
      <Scrollbars
        ref={scrollbarsRef}
        autoHide
        style={{ width: '100%', height: '80vh' }}
        onScroll={handleScroll}
      >
        <ul className="flex flex-col gap-2 p-3">
          {messages && messages.map(mes => {
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
    </>
  );
}

export default MessageList;
