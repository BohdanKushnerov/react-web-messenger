import { DocumentData, Firestore, doc, updateDoc } from 'firebase/firestore';
import { DefaultExtensionType, FileIcon, defaultStyles } from 'react-file-icon';

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

  if (
    mes.data().senderUserID !== currentUserUID &&
    !mes.data().isRead &&
    chatUID
  ) {
    makeReadMes(db, chatUID, mes.id);
  }

  return (
    <div
      className={`relative flex w-full items-end ${
        myUID ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`flex flex-col gap-2 py-2 px-4 rounded-xl ${
          myUID ? 'bg-cyan-600 rounded-br-none' : 'bg-green-600 rounded-bl-none'
        }`}
      >
        {mes.data().file &&
          mes
            .data()
            .file.map(
              (
                file: { url: string; name: string; type: string },
                index: number
              ) => {
                const fileType: DefaultExtensionType =
                  (file.name.split('.').pop() as DefaultExtensionType) ||
                  'default';

                return (
                  <div key={index}>
                    {file.type === 'image/png' ||
                    file.type === 'image/jpeg' ||
                    file.type === 'image/webp' ||
                    file.type === 'image/svg+xml' ? (
                      <img
                        src={file.url}
                        alt={file.type}
                        width={file.type === 'image/svg+xml' ? 25 : 400}
                        height={400}
                      />
                    ) : (
                      <p className="flex gap-8 items-center h-12 ">
                        <span className="w-10 h-10">
                          <FileIcon
                            extension={fileType}
                            {...defaultStyles[fileType]}
                          />
                          {/* )} */}
                        </span>
                        <span className="text-white">{file.name}</span>
                        <a href={file.url}>Link</a>
                      </p>
                    )}
                  </div>
                );
              }
            )}
        <p className="break-all text-white">{mes.data().message}</p>
        <div className='flex justify-end items-center gap-2'>
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
      <svg
        className={`absolute ${myUID ? '-right-3.5' : '-left-1.5'}`}
        width="16px"
        height="16px"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        {myUID ? (
          <path
            d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z"
            fill="rgb(8 145 178)"
          ></path>
        ) : (
          <path
            d="M3 17h6V0c-.193 2.84-.876 5.767-2.05 8.782-.904 2.325-2.446 4.485-4.625 6.48A1 1 0 003 17z"
            fill="rgb(22 163 74)"
            filter="url(#messageAppendix)"
          ></path>
        )}
      </svg>
    </div>
  );
}
