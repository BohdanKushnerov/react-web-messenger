import { DocumentData, Firestore, doc, updateDoc } from 'firebase/firestore';

import { db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import formatTime from '@utils/formatTime';

interface IMessageItem {
  mes: DocumentData;
}

export default function MessageItem({ mes }: IMessageItem) {
  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const { chatUID } = useChatStore(state => state.currentChatInfo);

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
    <div
      className={`relative flex w-full ${
        myUID ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`w-36 py-2 px-4 border border-white rounded-3xl ${
          myUID ? 'bg-blue-800' : 'bg-green-800'
        }`}
      >
        {(mes.data().type === 'image/png' ||
          mes.data().type === 'image/jpeg' ||
          mes.data().type === 'image/svg+xml') && (
            <img src={mes.data().file} alt={mes.data().message} />
          )}
        <p className="break-all text-white">{mes.data().message}</p>
        <p className="text-white ">
          {mes.data().date && formatTime(mes.data().date.toDate().toString())}
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
      </div>
    </div>
  );
}
