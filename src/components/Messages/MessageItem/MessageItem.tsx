import { FC } from 'react';

import MessageFileItem from '@components/Messages/MessageFileItem/MessageFileItem';
import MessageImageItem from '@components/Messages/MessageImageItem/MessageImageItem';
import MessageTriangle from '@components/Messages/MessageTriangle/MessageTriangle';
import IsReadMsg from '@components/Messages/IsReadMsg/IsReadMsg';
import useChatStore from '@zustand/store';
import useMakeReadMsg from '@hooks/useMakeReadMsg';
import formatTimeMsg from '@utils/formatTimeMsg';
import { IMessageItemProps } from '@interfaces/IMessageItemProps';

const MessageItem: FC<IMessageItemProps> = ({ msg }) => {
  const currentUserUID = useChatStore(state => state.currentUser.uid);

  useMakeReadMsg(msg); // делает при монтировании чата прочитаные мои сообщения

  const myUID = currentUserUID === msg.data().senderUserID;

  return (
    <div
      className={`relative flex w-full items-end xl:w-8/12 ${
        myUID ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`flex flex-col py-2 px-4 rounded-xl ${
          msg.data().file?.length === 1 ? 'max-w-md' : 'max-w-sm'
        }  ${
          myUID
            ? 'bg-emerald-400 dark:bg-cyan-600 rounded-br-none'
            : 'bg-zinc-100 dark:bg-green-600 rounded-bl-none'
        } shadow-secondaryShadow`}
      >
        <div
          className={`flex flex-wrap sm:justify-center md:justify-normal gap-0.5 ${
            msg.data().file?.length === 1 ? 'max-w-md' : 'max-w-xs'
          }`}
        >
          {msg.data().file &&
            msg.data().file.map(
              (
                fileInside: {
                  url: string;
                  name: string;
                  type: string;
                  // уже есть ширина и высота на сервере
                  // width?: number;
                  // height?: number;
                },
                index: number
              ) => {
                if (
                  fileInside.type === 'image/png' ||
                  fileInside.type === 'image/jpeg' ||
                  fileInside.type === 'image/webp'
                ) {
                  return (
                    <MessageImageItem
                      key={index}
                      msg={msg}
                      file={fileInside}
                      index={index}
                    />
                  );
                } else {
                  return <MessageFileItem key={index} file={fileInside} />;
                }
              }
            )}
        </div>

        {/* message */}
        {msg.data().message && (
          <p className="w-full break-all text-black dark:text-white">
            {msg.data().message}
          </p>
        )}

        {/* date + read/unread */}
        <div className="w-full flex justify-end items-center gap-2">
          {/* date */}
          <p className="text-green-950 dark:text-zinc-100">
            {msg.data().date &&
              formatTimeMsg(msg.data().date.toDate().toString())}
          </p>

          {/* read/unread */}
          <IsReadMsg msg={msg} />
        </div>
      </div>
      {/* triangle */}
      <MessageTriangle myUID={myUID} />
    </div>
  );
};

export default MessageItem;
