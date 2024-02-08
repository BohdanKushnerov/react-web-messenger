import { FC, useCallback, useState } from 'react';

import MessageImagesWithLightBox from '../MessageImagesWithLightBox/MessageImagesWithLightBox';
import MessageFiles from '../MessageFiles/MessageFiles';
import MessageTriangle from '@components/Messages/MessageTriangle/MessageTriangle';
import IsReadMsg from '@components/Messages/IsReadMsg/IsReadMsg';
import useChatStore from '@zustand/store';
import useMakeReadMsg from '@hooks/useMakeReadMsg';
import formatTimeMsg from '@utils/formatTimeMsg';
import { IMessageItemProps } from '@interfaces/IMessageItemProps';

const MessageItem: FC<IMessageItemProps> = ({ msg, isNearBottom }) => {
  const [indexClickedPhoto, setIndexClickedPhoto] = useState(-1);

  const currentUserUID = useChatStore(state => state.currentUser.uid);

  useMakeReadMsg(msg, isNearBottom); // делает при монтировании чата прочитаные мои сообщения

  const handleClickPhoto = useCallback((index: number) => {
    setIndexClickedPhoto(index);
  }, []);

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
          id="file-container"
        >
          <MessageImagesWithLightBox
            msg={msg}
            indexClickedPhoto={indexClickedPhoto}
            handleClickPhoto={handleClickPhoto}
          />
          <MessageFiles msg={msg} />
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
