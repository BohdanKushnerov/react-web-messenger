import { FC, memo } from 'react';
import { DocumentData } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';

import MessageItem from '../MessageItem/MessageItem';
import formatDateForGroupMessages from '@utils/messages/formatDateForGroupMessages';
import { IMessageListProps } from '@interfaces/IMessageListProps';
import sprite from '@assets/sprite.svg';

const MessageList: FC<IMessageListProps> = memo(
  ({
    msgListRef,
    bottomElementRef,
    groupedMessages,
    isLoadedContent,
    isSelectedMessages,
    selectedDocDataMessage,
    handleClickRigthButtonMessage,
    handleToggleSelectedMessage,
    isScrollDownButtonVisible,
  }) => {
    const { t } = useTranslation();

    // console.log('screen --> MessageList');

    return (
      <div
        ref={msgListRef}
        className={`flex flex-col justify-end min-h-full px-6 gap-2 ${
          !isLoadedContent && 'invisible'
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
              <li className="flex justify-center sticky top-1 z-10 ">
                <p className="px-2 py-0.5 w-min-0 whitespace-no-wrap rounded-xl bg-zinc-200/40 text-green-100 text-center">
                  {formatDateForGroupMessages(date, t)}
                </p>
              </li>
              {groupedMessages[date].map((message: DocumentData) => {
                const currentItem = selectedDocDataMessage?.find(
                  msg => msg.id === message.id
                );

                return (
                  <li
                    className={`flex justify-center items-center gap-x-5 m-0.5 rounded-xl transition-all duration-150  ${
                      currentItem && 'bg-currentContextMenuMessage'
                    } ${
                      isSelectedMessages &&
                      'hover:cursor-pointer hover:outline hover:outline-1 hover:outline-white'
                    }`}
                    key={message.id}
                    onContextMenu={e =>
                      handleClickRigthButtonMessage(message, e)
                    }
                    onClick={() =>
                      isSelectedMessages && handleToggleSelectedMessage(message)
                    }
                    id="documentDataMsg"
                  >
                    {isSelectedMessages && currentItem ? (
                      <svg width={32} height={32} id="select">
                        <use href={sprite + '#icon-select'} fill="#FFFFFF" />
                      </svg>
                    ) : (
                      isSelectedMessages &&
                      !currentItem && (
                        <svg width={32} height={32} id="not-select">
                          <use
                            href={sprite + '#icon-not-select'}
                            fill="#FFFFFF"
                          />
                        </svg>
                      )
                    )}
                    <MessageItem
                      msg={message}
                      isNearBottom={!isScrollDownButtonVisible}
                      isSelectedMessages={isSelectedMessages}
                    />
                  </li>
                );
              })}
            </ul>
          ))}
        <div id="bottomItem" ref={bottomElementRef} className="h-0 w-0"></div>
      </div>
    );
  }
);

export default MessageList;
