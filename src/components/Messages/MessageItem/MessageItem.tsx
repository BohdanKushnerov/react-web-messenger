import type { FC } from 'react';

import type { DocumentData } from 'firebase/firestore';
import urlParser from 'js-video-url-parser';

import IsEdited from '../IsEdited/IsEdited';
import LinkMessage from '../LinkMessage/LinkMessage';
import MessageFiles from '../MessageFiles/MessageFiles';
import MessageImagesWithLightBox from '../MessageImagesWithLightBox/MessageImagesWithLightBox';
import ReactionsDisplay from '../MessageReactions/ReactionsDisplay';

import IsReadMessage from '@components/Messages/IsReadMessage/IsReadMessage';
import MessageTriangle from '@components/Messages/MessageTriangle/MessageTriangle';

import useChatStore from '@store/store';

import useMakeReadMessage from '@hooks/messages/useMakeReadMessage';

import isLinkMessage from '@utils/isLinkMessage';
import formatTimeMessage from '@utils/messages/formatTimeMessage';
import getFilesWithoutImages from '@utils/messages/getFilesWithoutImages';

import type { IFile } from '@interfaces/IFile';

import { ElementsId } from '@enums/elementsId';

interface IMessageItemProps {
  msg: DocumentData;
  isNearBottom: boolean;
}

const MessageItem: FC<IMessageItemProps> = ({ msg, isNearBottom }) => {
  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const isSelectedMessages = useChatStore(state => state.isSelectedMessages);

  useMakeReadMessage(msg, isNearBottom);

  const myUID = currentUserUID === msg.data().senderUserID;

  const textContentMessage: string = msg.data().message;

  const info = urlParser.parse(textContentMessage);

  const isLink = isLinkMessage(textContentMessage);

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
            textContentMessage={textContentMessage}
            isVideo={info?.mediaType === 'video'}
          />
        ) : (
          <p className="min-w-fit whitespace-normal break-words text-black dark:text-white">
            {msg.data().message}
          </p>
        )}

        <div className="flex w-full flex-wrap items-end justify-between gap-2">
          <ReactionsDisplay reactions={msg.data().reactions} />

          <div className="flex items-baseline gap-2">
            <IsEdited isEdited={msg.data().isEdited} />

            <div className="flex items-center gap-2">
              <p className="text-nearBlackGreen dark:text-veryLightZinc">
                {msg.data().date &&
                  formatTimeMessage(msg.data().date.toDate().toString())}
              </p>

              {myUID && <IsReadMessage msg={msg} />}
            </div>
          </div>
        </div>
      </div>
      <MessageTriangle myUID={myUID} />
    </div>
  );
};

export default MessageItem;
