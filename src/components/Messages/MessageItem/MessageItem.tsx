import { FC, useCallback, useState } from 'react';
import urlParser from 'js-video-url-parser';

import MessageImagesWithLightBox from '../MessageImagesWithLightBox/MessageImagesWithLightBox';
import MessageFiles from '../MessageFiles/MessageFiles';
import VideoComponent from '../VideoComponent/VideoComponent';
import MessageTriangle from '@components/Messages/MessageTriangle/MessageTriangle';
import IsReadMsg from '@components/Messages/IsReadMsg/IsReadMsg';
import useChatStore from '@zustand/store';
import useMakeReadMsg from '@hooks/useMakeReadMsg';
import formatTimeMsg from '@utils/messages/formatTimeMsg';
import isLinkMsg from '@utils/isLinkMsg';
import { IMessageItemProps } from '@interfaces/IMessageItemProps';
import { IFile } from '@interfaces/IFile';

const MessageItem: FC<IMessageItemProps> = ({
  msg,
  isNearBottom,
  isSelectedMessages,
}) => {
  const [indexClickedPhoto, setIndexClickedPhoto] = useState(-1);

  const currentUserUID = useChatStore(state => state.currentUser.uid);

  useMakeReadMsg(msg, isNearBottom); // делает при монтировании чата прочитаные мои сообщения

  const handleClickPhoto = useCallback(
    (index: number) => {
      if (!isSelectedMessages) {
        setIndexClickedPhoto(index);
      }
    },
    [isSelectedMessages]
  );

  const myUID = currentUserUID === msg.data().senderUserID;

  const textContentMsg: string = msg.data().message;

  const info = urlParser.parse(textContentMsg);

  const isLink = isLinkMsg(textContentMsg);

  // console.log('msg.data().file', msg.data().file);

  return (
    <div
      className={`relative flex w-full items-end xl:w-8/12 ${
        myUID ? 'justify-end' : 'justify-start'
      }`}
      id="message"
    >
      <div
        className={`flex flex-col items-center py-2 px-4 ${
          isLink && info?.mediaType === 'video' && 'w-full'
        } rounded-xl ${
          msg.data().file?.length === 1 ? 'max-w-md' : 'max-w-xl'
        }  ${
          myUID
            ? 'bg-emerald-400 dark:bg-cyan-600 rounded-br-none'
            : 'bg-zinc-100 dark:bg-green-600 rounded-bl-none'
        } shadow-secondaryShadow`}
      >
        {msg.data().file &&
          msg
            .data()
            .file.some((file: IFile) => file.type.includes('image')) && (
            <div
              className={`flex flex-wrap sm:justify-center lg:justify-normal gap-0.5 ${
                msg.data().file?.length === 1
                  ? 'max-w-md'
                  : 'w-[160px] lg:w-full max-w-xs'
              }`}
              id="file-container"
            >
              <MessageImagesWithLightBox
                msg={msg}
                indexClickedPhoto={indexClickedPhoto}
                handleClickPhoto={handleClickPhoto}
              />
            </div>
          )}

        {msg.data().file && <MessageFiles msg={msg} />}

        {/* message */}
        {isLink ? (
          <>
            <a
              className="w-full break-all transition-colors duration-150 text-blue-950 hover:text-blue-800 dark:text-zinc-800 text-decoration-line: hover:underline hover:dark:text-zinc-600"
              href={
                textContentMsg.startsWith('https://')
                  ? textContentMsg
                  : 'https://' + textContentMsg
              }
              target="_blank"
              rel="noreferrer noopener"
            >
              {textContentMsg}
            </a>
            {info?.mediaType === 'video' && (
              <VideoComponent source={textContentMsg} />
            )}
          </>
        ) : (
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
