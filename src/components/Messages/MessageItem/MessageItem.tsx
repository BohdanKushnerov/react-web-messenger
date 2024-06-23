import { FC } from 'react';

import urlParser from 'js-video-url-parser';

import IsEdited from '../IsEdited/IsEdited';
import LinkMessage from '../LinkMessage/LinkMessage';
import MessageFiles from '../MessageFiles/MessageFiles';
import MessageImagesWithLightBox from '../MessageImagesWithLightBox/MessageImagesWithLightBox';
import ReactionsDisplay from '../MessageReactions/ReactionsDisplay';

import IsReadMsg from '@components/Messages/IsReadMsg/IsReadMsg';
import MessageTriangle from '@components/Messages/MessageTriangle/MessageTriangle';

import useChatStore from '@zustand/store';

import useMakeReadMsg from '@hooks/useMakeReadMsg';

import isLinkMsg from '@utils/isLinkMsg';
import formatTimeMsg from '@utils/messages/formatTimeMsg';
import getFilesWithoutImages from '@utils/messages/getFilesWithoutImages';

import { IFile } from '@interfaces/IFile';
import { IMessageItemProps } from '@interfaces/IMessageItemProps';

import { ElementsId } from '@enums/elementsId';

const MessageItem: FC<IMessageItemProps> = ({ msg, isNearBottom }) => {
  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const isSelectedMessages = useChatStore(state => state.isSelectedMessages);

  useMakeReadMsg(msg, isNearBottom);

  const myUID = currentUserUID === msg.data().senderUserID;

  const textContentMsg: string = msg.data().message;

  const info = urlParser.parse(textContentMsg);

  const isLink = isLinkMsg(textContentMsg);

  const isImages = msg
    .data()
    .file?.some((file: IFile) => file.type.includes('image'));

  const filteredFiles = getFilesWithoutImages(msg);

  return (
    <div
      id={ElementsId.Message}
      className={`relative flex w-full items-end xl:w-8/12 ${
        myUID ? 'justify-end' : 'justify-start'
      } ${isSelectedMessages && 'pointer-events-none'}`}
    >
      <div
        className={`flex flex-col items-center px-4 py-2 ${
          isLink && info?.mediaType === 'video' && 'w-full'
        } rounded-xl ${
          msg.data().file?.length === 1 ? 'max-w-md' : 'max-w-xl'
        } ${
          myUID
            ? 'rounded-br-none bg-mediumEmerald dark:bg-mediumDarkCyan'
            : 'rounded-bl-none bg-veryLightZinc dark:bg-darkGreen'
        } shadow-secondaryShadow`}
      >
        {isImages && <MessageImagesWithLightBox msg={msg} />}

        {filteredFiles && <MessageFiles filteredFiles={filteredFiles} />}

        {isLink ? (
          <LinkMessage
            textContentMsg={textContentMsg}
            isVideo={info?.mediaType === 'video'}
          />
        ) : (
          <p className="w-full break-all text-black dark:text-white">
            {msg.data().message}
          </p>
        )}

        <div className="flex w-full items-baseline justify-between gap-2">
          <ReactionsDisplay reactions={msg.data().reactions} />

          <IsEdited isEdited={msg.data().isEdited} />

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
