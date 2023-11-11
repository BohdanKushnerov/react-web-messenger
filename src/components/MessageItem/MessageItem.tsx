import { DocumentData, Firestore, doc, updateDoc } from 'firebase/firestore';

import MessageFileItem from '@components/MessageFileItem/MessageFileItem';
import { db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import formatTime from '@utils/formatTime';
import sprite from '@assets/sprite.svg';

interface IMessageItemProps {
  mes: DocumentData;
}

export default function MessageItem({ mes }: IMessageItemProps) {
  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const { chatUID } = useChatStore(state => state.currentChatInfo);

  const makeReadMes = async (
    db: Firestore,
    chatUID: string,
    mes: DocumentData
  ) => {
    if (chatUID === null) {
      // Обработка случая, когда chatUID равен null
      return;
    }

    updateDoc(doc(db, 'chats', chatUID, 'messages', `${mes}`), {
      ['isRead']: true,
    });
  };

  if (
    mes.data().senderUserID !== currentUserUID &&
    !mes.data().isRead &&
    chatUID
  ) {
    makeReadMes(db, chatUID, mes.id);
  }

  const myUID = currentUserUID === mes.data().senderUserID;

  return (
    <div
      className={`relative flex w-full items-end xl:w-8/12 ${
        myUID ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`flex flex-col py-2 px-4 rounded-xl max-w-sm ${
          myUID
            ? 'bg-emerald-400 dark:bg-cyan-600 rounded-br-none'
            : 'bg-zinc-100 dark:bg-green-600 rounded-bl-none'
        } shadow-secondaryShadow`}
      >
        <div className="flex flex-wrap gap-0.5 max-w-xs">
          {mes.data().file &&
            mes.data().file.map(
              (
                file: {
                  url: string;
                  name: string;
                  type: string;
                  width?: number;
                  height?: number;
                },
                index: number
              ) => {
                return file.type === 'image/png' ||
                  file.type === 'image/jpeg' ||
                  file.type === 'image/webp' ? (
                  <img
                    key={index}
                    src={file.url}
                    alt={file.type}
                    style={{
                      width: index === 0 ? 320 : 159,
                      height: 'auto',
                      maxHeight: index === 0 ? 320 : 159,
                      objectFit: 'cover',
                      borderRadius: 6,
                    }}
                    loading="lazy"
                  />
                ) : (
                  <MessageFileItem key={index} file={file} />
                );
              }
            )}
        </div>
        {/* <div className="flex flex-wrap justify-start gap-0.5">
          {mes.data().file &&
            mes.data().file.map(
              (
                file: {
                  url: string;
                  name: string;
                  type: string;
                  width?: number;
                  height?: number;
                },
                index: number
              ) => {
                // console.log(file.width/ file.height);
                return file.type === 'image/png' ||
                  file.type === 'image/jpeg' ||
                  file.type === 'image/webp' ? (
                  <img
                    key={index}
                    src={file.url}
                    alt={file.type}
                    style={{
                      width: '100%',
                      // maxWidth: index === 0 ? 304 : 150,
                      maxHeight: index === 0 ? 304 : 150,
                      // marginRight: index === 0 ? 'auto' : '0',
                      height: 'auto',
                      // maxHeight: 400,
                      objectFit: 'cover',
                    }}
                    loading="lazy"
                  />
                ) : (
                  <MessageFileItem key={index} file={file} />
                );
              }
            )}
        </div> */}
        <p className="w-full break-all text-black dark:text-white">
          {mes.data().message}
        </p>
        <div className="w-full flex justify-end items-center gap-2">
          <p className="text-zinc-600 dark:text-white">
            {mes.data().date && formatTime(mes.data().date.toDate().toString())}
          </p>
          <p>
            {mes.data().isRead ? (
              <svg
                width={24}
                height={24}
                className="fill-zinc-800 dark:fill-white"
              >
                <use href={sprite + '#icon-double-check'} />
              </svg>
            ) : (
              <svg
                width={24}
                height={24}
                className="fill-zinc-800 dark:fill-white"
              >
                <use href={sprite + '#icon-single-check'} />
              </svg>
            )}
          </p>
        </div>
      </div>
      <svg
        className={`absolute ${
          myUID
            ? '-right-3.5 fill-emerald-400 dark:fill-cyan-600'
            : '-left-1.5 fill-zinc-100 dark:fill-green-600'
        }`}
        width="16px"
        height="16px"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        {myUID ? (
          <path d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z"></path>
        ) : (
          <path
            d="M3 17h6V0c-.193 2.84-.876 5.767-2.05 8.782-.904 2.325-2.446 4.485-4.625 6.48A1 1 0 003 17z"
            filter="url(#messageAppendix)"
          ></path>
        )}
      </svg>
    </div>
  );
}
