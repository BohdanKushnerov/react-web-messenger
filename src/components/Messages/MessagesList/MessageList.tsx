import { forwardRef, memo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { DocumentData } from 'firebase/firestore';

import MessageItem from '../MessageItem/MessageItem';
import SelectIcons from '../SelectIcons/SelectIcons';

import ButtonScrollDown from '@components/Buttons/ButtonScrollDown/ButtonScrollDown';

import useChatStore from '@zustand/store';

import useLengthOfMyUnreadMsgs from '@hooks/useLengthOfMyUnreadMsgs';
import useQuickScrollToBottom from '@hooks/useQuickScrollToBottom';

import formatDateForGroupMessages from '@utils/messages/formatDateForGroupMessages';

import { IMessageListProps } from '@interfaces/IMessageListProps';

import { ElementsId } from '@enums/elementsId';

const MessageList = memo(
  forwardRef<HTMLDivElement, IMessageListProps>((props, ref) => {
    const {
      chatUID,
      groupedMessages,
      isReadyFirstMsgs,
      selectedDocDataMessage,
      handleClickRigthButtonMessage,
      handleToggleSelectedMessage,
      isScrollDownButtonVisible,
    } = props;

    const bottomElementRef = useRef<HTMLDivElement>(null);

    const { t } = useTranslation();

    const isSelectedMessages = useChatStore(state => state.isSelectedMessages);

    const lengthOfUnreadMsgs = useLengthOfMyUnreadMsgs(chatUID, true, false);
    useQuickScrollToBottom(
      bottomElementRef,
      isReadyFirstMsgs,
      isScrollDownButtonVisible,
      groupedMessages
    );

    const scrollToBottom = () => {
      if (bottomElementRef.current) {
        bottomElementRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }
    };

    return (
      <>
        <div
          ref={ref}
          className={`flex min-h-full flex-col justify-end gap-2 px-6 ${
            !isReadyFirstMsgs && 'invisible'
          }`}
        >
          {groupedMessages &&
            Object.keys(groupedMessages).map(date => (
              <ul
                className={`relative flex flex-col ${
                  isSelectedMessages ? 'gap-0' : 'gap-2'
                }`}
                key={date}
              >
                <li className="pointer-events-none sticky top-1 z-10 flex justify-center">
                  <p className="w-min-0 whitespace-no-wrap rounded-xl bg-lightZincOpacity40 px-2 py-0.5 text-center text-veryLightGreen">
                    {formatDateForGroupMessages(date, t)}
                  </p>
                </li>
                {groupedMessages[date].map((message: DocumentData) => {
                  const currentItem = selectedDocDataMessage?.find(
                    msg => msg.id === message.id
                  );

                  return (
                    <li
                      id={ElementsId.DocumentDataMsg}
                      className={`flex items-center justify-center gap-x-5 rounded-xl transition-all duration-150 ${
                        currentItem && 'bg-ultraDarkZinc'
                      } ${
                        isSelectedMessages &&
                        'hover:z-10 hover:cursor-pointer hover:outline hover:outline-1 hover:outline-white'
                      }`}
                      key={message.id}
                      onContextMenu={e =>
                        handleClickRigthButtonMessage(message, e)
                      }
                      onClick={() =>
                        isSelectedMessages &&
                        handleToggleSelectedMessage(message)
                      }
                    >
                      <SelectIcons
                        isSelectedMessages={isSelectedMessages}
                        currentItem={currentItem}
                      />
                      <MessageItem
                        msg={message}
                        isNearBottom={!isScrollDownButtonVisible}
                      />
                    </li>
                  );
                })}
              </ul>
            ))}
          <div
            id={ElementsId.BottomItem}
            ref={bottomElementRef}
            className="h-0 w-0"
          ></div>
        </div>

        {isScrollDownButtonVisible && isReadyFirstMsgs && (
          <ButtonScrollDown
            scrollToBottom={scrollToBottom}
            lengthOfUnreadMsgs={lengthOfUnreadMsgs}
          />
        )}
      </>
    );
  })
);

MessageList.displayName = 'MessageList';

export default MessageList;
