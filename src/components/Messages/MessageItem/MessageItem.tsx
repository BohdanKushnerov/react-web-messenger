import { FC, useCallback, useState } from 'react';
import urlParser from 'js-video-url-parser';
import { useTranslation } from 'react-i18next';

import MessageImagesWithLightBox from '../MessageImagesWithLightBox/MessageImagesWithLightBox';
import MessageFiles from '../MessageFiles/MessageFiles';
import VideoComponent from '../VideoComponent/VideoComponent';
import ReactionsDisplay from '../MessageReactions/ReactionsDisplay';
import MessageTriangle from '@components/Messages/MessageTriangle/MessageTriangle';
import IsReadMsg from '@components/Messages/IsReadMsg/IsReadMsg';
import useChatStore from '@zustand/store';
import useMakeReadMsg from '@hooks/useMakeReadMsg';
import formatTimeMsg from '@utils/messages/formatTimeMsg';
import isLinkMsg from '@utils/isLinkMsg';
import { IMessageItemProps } from '@interfaces/IMessageItemProps';
import { IFile } from '@interfaces/IFile';
import sprite from '@assets/sprite.svg';

const MessageItem: FC<IMessageItemProps> = ({
  msg,
  isNearBottom,
  isSelectedMessages,
}) => {
  const [indexClickedPhoto, setIndexClickedPhoto] = useState(-1);
  const { t } = useTranslation('translation', { keyPrefix: 'General' });

  const currentUserUID = useChatStore(state => state.currentUser.uid);

  useMakeReadMsg(msg, isNearBottom);

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

  return (
    <div
      className={`relative flex w-full items-end xl:w-8/12 ${
        myUID ? 'justify-end' : 'justify-start'
      } ${isSelectedMessages && 'pointer-events-none'}`}
      id="message"
    >
      <div
        className={`flex flex-col items-center py-2 px-4 ${
          isLink && info?.mediaType === 'video' && 'w-full'
        } rounded-xl ${
          msg.data().file?.length === 1 ? 'max-w-md' : 'max-w-xl'
        }  ${
          myUID
            ? 'bg-mediumEmerald dark:bg-mediumDarkCyan rounded-br-none'
            : 'bg-veryLightZinc dark:bg-darkGreen rounded-bl-none'
        } shadow-secondaryShadow`}
      >
        {msg
          .data()
          .file?.some((file: IFile) => file.type.includes('image')) && (
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

        {isLink ? (
          <>
            <a
              className="w-full break-all transition-colors duration-150 text-nearBlackBlue hover:text-extraDarkBlue dark:text-ultraDarkZinc text-decoration-line: hover:underline hover:dark:text-darkZinc"
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

        <div className="w-full flex items-baseline justify-between gap-2">
          <ReactionsDisplay reactions={msg.data().reactions} />

          {msg.data().isEdited && (
            <>
              <svg width={8} height={8} className="fill-darkZinc">
                <use href={sprite + '#icon-pencil'} />
              </svg>
              <p className="text-sm text-darkZinc">{t('Edited')}</p>
            </>
          )}

          <div className="flex items-center gap-2">
            <p className="text-nearBlackGreen dark:text-veryLightZinc">
              {msg.data().date &&
                formatTimeMsg(msg.data().date.toDate().toString())}
            </p>

            <IsReadMsg msg={msg} />
          </div>
        </div>
      </div>
      <MessageTriangle myUID={myUID} />
    </div>
  );
};

export default MessageItem;
