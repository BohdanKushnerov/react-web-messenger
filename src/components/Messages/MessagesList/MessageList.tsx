import { forwardRef, memo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import type { DocumentData } from 'firebase/firestore';

import MessageItem from '../MessageItem/MessageItem';
import SelectIcons from '../SelectIcons/SelectIcons';

import ScrollDown from '@components/ScrollDown/ScrollDown';
import Button from '@components/common/Button/Button';
import TransitionComponent from '@components/common/TransitionComponent/TransitionComponent';

import useChatStore from '@store/store';

import useQuickScrollToBottom from '@hooks/messages/useQuickScrollToBottom';
import useLengthOfMyUnreadMessages from '@hooks/useLengthOfMyUnreadMessages';

import formatDateForGroupMessages from '@utils/messages/formatDateForGroupMessages';

import { ElementsId } from '@enums/elementsId';

import type { GroupedMessages } from 'types/GroupedMessages';

interface IMessageListProps {
  chatUID: string | null;
  groupedMessages: GroupedMessages | null;
  isReadyFirstMessages: boolean;
  selectedDocDataMessage: DocumentData[] | null;
  isScrollDownButtonVisible: boolean;
  handleClickRigthButtonMessage: (
    message: DocumentData,
    e: React.MouseEvent
  ) => void;
  handleToggleSelectedMessage: (message: DocumentData) => void;
}

const MessageList = memo(
  forwardRef<HTMLDivElement, IMessageListProps>(
    (
      {
        chatUID,
        groupedMessages,
        isReadyFirstMessages,
        selectedDocDataMessage,
        handleClickRigthButtonMessage,
        handleToggleSelectedMessage,
        isScrollDownButtonVisible,
      },
      ref
    ) => {
      const bottomElementRef = useRef<HTMLDivElement>(null);
      const buttonScrollDownRef = useRef(null);

      const { t } = useTranslation();

      const isSelectedMessages = useChatStore(
        state => state.isSelectedMessages
      );

      const lengthOfUnreadMessages = useLengthOfMyUnreadMessages(
        chatUID,
        true,
        false
      );
      useQuickScrollToBottom(
        bottomElementRef,
        isReadyFirstMessages,
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
              !isReadyFirstMessages && 'invisible'
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
                        id={ElementsId.DocumentDataMessage}
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
            />
          </div>

          <TransitionComponent
            className="absolute bottom-32 right-10 origin-right"
            nodeRef={buttonScrollDownRef}
            exitedBehavior="hidden"
            enteredBehavior="opacity"
            condition={isScrollDownButtonVisible && isReadyFirstMessages}
            timeout={100}
          >
            <Button
              variant="scrollDown"
              type="button"
              onClick={scrollToBottom}
              ariaLabel="Scroll down"
            >
              <ScrollDown lengthOfUnreadMessages={lengthOfUnreadMessages} />
            </Button>
          </TransitionComponent>
        </>
      );
    }
  )
);

MessageList.displayName = 'MessageList';

export default MessageList;
