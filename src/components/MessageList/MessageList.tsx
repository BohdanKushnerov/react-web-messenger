import { useEffect, useState, useRef, FC, Suspense, lazy } from 'react';
import {
  DocumentData,
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useTranslation } from 'react-i18next';

import MessagesSkeleton from './MessagesSkeleton/MessagesSkeleton';
import LoaderUIActions from '@components/LoaderUIActions/LoaderUIActions';
import ButtonScrollDown from '@components/Buttons/ButtonScrollDown/ButtonScrollDown';
import MessageItem from '@components/MessageList/MessageItem/MessageItem';
const ChatContextMenu = lazy(
  () => import('../ChatContextMenu/ChatContextMenu')
);
const MessageContextMenuModal = lazy(
  () =>
    import('@components/Modals/ModalMessageContextMenu/ModalMessageContextMenu')
);
import { db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import useLengthOfMyUnreadMsgs from '@hooks/useLengthOfMyUnreadMsgs';
import formatDateForGroupMessages from '@utils/messages/formatDateForGroupMessages';
import { IGroupedMessages } from '@interfaces/IGroupedMessages';
import sprite from '@assets/sprite.svg';
import '@i18n';

const MessageList: FC = () => {
  const [groupedMessages, setGroupedMessages] =
    useState<IGroupedMessages | null>(null);
  const [isScrollDownButtonVisible, setIsScrollDownButtonVisible] =
    useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [isLoadedContent, setIsLoadedContent] = useState(false);
  const scrollbarsRef = useRef<Scrollbars>(null);
  const msgListRef = useRef<HTMLUListElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { t } = useTranslation();

  const { chatUID } = useChatStore(state => state.currentChatInfo);
  const isSelectedMessages = useChatStore(state => state.isSelectedMessages);
  const updateIsSelectedMessages = useChatStore(
    state => state.updateIsSelectedMessages
  );
  const selectedDocDataMessage = useChatStore(
    state => state.selectedDocDataMessage
  );
  const updateSelectedDocDataMessage = useChatStore(
    state => state.updateSelectedDocDataMessage
  );
  const resetSelectedMessages = useChatStore(
    state => state.resetSelectedMessages
  );

  const lengthOfUnreadMsgs = useLengthOfMyUnreadMsgs(
    [chatUID, { lastMessage: '', senderUserID: '', userUID: '' }],
    true
  );

  // тоглит чат форму вместо кнопок интерфейса выбраных сообщений
  useEffect(() => {
    if (!isSelectedMessages) {
      updateSelectedDocDataMessage(null);
    }
  }, [isSelectedMessages, updateSelectedDocDataMessage]);

  // если убрал последний селект то убираються кнопки интерфейса выбраных сообщений и квадратики для селектов
  useEffect(() => {
    if (selectedDocDataMessage === null) {
      updateIsSelectedMessages(false);
    }
  }, [selectedDocDataMessage, updateIsSelectedMessages]);

  // еффект ждет пока загрузятся фотки на странице, чтобы не было скачков,
  // далее таймаут чтобы успели попасть в дом дерево и уже там по селектору взять их
  // и посмотреть на их load
  useEffect(() => {
    // Проверяем, был ли таймер уже запущен
    if (
      !isLoadedContent &&
      groupedMessages &&
      msgListRef.current &&
      !timeoutRef.current
    ) {
      // quickScrollBottom();
      console.log('===================таймер уже запущен===================');

      timeoutRef.current = setTimeout(() => {
        const imagesInMessages = msgListRef?.current?.querySelectorAll('img');
        console.log('imagesInMessages', imagesInMessages);
        if (imagesInMessages && imagesInMessages.length > 0) {
          // console.log('imagesInMessages', imagesInMessages);

          const loadImage = (url: string) => {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.onload = () => resolve(img);
              img.onerror = reject;
              img.src = url;
            });
          };

          const loadAllImages = async (
            images: NodeListOf<HTMLImageElement>
          ) => {
            try {
              await Promise.all([...images].map(img => loadImage(img.src)))
                .then(() => {
                  console.log(
                    '---------------------quickScrollBottom imagesInMessages'
                  );
                  // quickScrollBottom();
                  // setTimeout(() => {
                  //   setIsLoadedContent(true);
                  // }, 100);
                })
                .then(() => {
                  console.log(
                    '---------------------quickScrollBottom imagesInMessages'
                  );
                  quickScrollBottom();
                })
                .then(() => setIsLoadedContent(true));
            } catch (error) {
              console.error('Error loading images:', error);
            }
          };

          loadAllImages(imagesInMessages);
        } else {
          // если нету фото делаем скролл вниз
          // quickScrollBottom();
          // setTimeout(() => {
          //   setIsLoadedContent(true);
          // }, 100);

          quickScrollBottom();
          setIsLoadedContent(true);
          console.log(
            '===================таймер уже ВСЕЕЕЕЕЕЕЕЕЕЕ нету фото==================='
          );
        }
      }, 200);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null; // Сбрасываем таймер
      }
    };
  }, [groupedMessages, isLoadedContent]);

  // авто скролл вниз при новом сообщении если я внизу списка
  useEffect(() => {
    if (scrollbarsRef.current) {
      if (!isScrollDownButtonVisible && isLoadedContent) {
        scrollToBottom();
        // console.log('==========================етот скролл работает');
      }
    }
  }, [groupedMessages, isScrollDownButtonVisible, isLoadedContent]);

  // скелетон сообщений
  useEffect(() => {
    setIsLoadedContent(false);

    return () => {
      setIsLoadedContent(false);
    };
  }, [chatUID]);

  useEffect(() => {
    if (chatUID === null) return;

    const queryParams = query(
      collection(db, `chats/${chatUID}/messages`),
      orderBy('date', 'asc')
    );

    const unsubChatMessages = onSnapshot(queryParams, snapshot => {
      // console.log('snapshot.metadata.fromCache', snapshot.metadata.fromCache);
      console.log(snapshot.docs, snapshot.metadata.fromCache);
      // if (snapshot.metadata.fromCache === false) {
      //   setIsLoadedContent(false);
      // }
      const updatedMessages: DocumentData[] = snapshot.docs;

      // Группировка сообщений по дате (та что sticky)
      const groupedMsgs = updatedMessages.reduce((acc, message) => {
        const messageData = message.data();
        if (messageData && messageData.date) {
          const date = messageData.date.toDate();
          const dateString = date.toISOString().split('T')[0];

          acc[dateString] = acc[dateString] || [];
          acc[dateString].push(message);
        }

        return acc;
      }, {});

      // console.log('groupedMsgs', groupedMsgs);

      setGroupedMessages(groupedMsgs);
    });

    return () => {
      unsubChatMessages();
    };
  }, [chatUID]);

  // Добавляет currentChatId в локалСторидж, чтобы при перезагрузке врнуться на текущий чат
  useEffect(() => {
    if (chatUID) {
      localStorage.setItem('currentChatId', chatUID);
    }

    return () => {
      localStorage.removeItem('currentChatId');
    };
  }, [chatUID]);

  // сброс выделеных сообщений через селект при смене чата
  useEffect(() => {
    resetSelectedMessages();
  }, [chatUID, resetSelectedMessages]);

  // надо тротл добавить чтобы не так часто срабатывало
  const handleScroll = () => {
    const scrollHeight = scrollbarsRef.current?.getScrollHeight() || 0;
    const clientHeight = scrollbarsRef.current?.getClientHeight() || 0;
    const scrollTop = scrollbarsRef.current?.getScrollTop() || 0;

    const isNearBottom = scrollHeight - scrollTop - clientHeight > 100;

    setIsScrollDownButtonVisible(isNearBottom);
  };

  const handleClickRigthButtonMessage = (
    message: DocumentData,
    e?: React.MouseEvent
  ) => {
    if (e) {
      e.preventDefault();

      // сброс предидущего значения перед слудующим
      if (isSelectedMessages) {
        updateIsSelectedMessages(false);
      }

      const chatContainerEl = document.getElementById('scrollbars');
      // console.log(chatContainerEl);
      const rect = chatContainerEl?.getBoundingClientRect();
      const containerTop = rect?.top;
      const containerLeft = rect?.left;

      const menuWidth = 224;
      const menuHeight = 224;

      // тут получаеться есть и сайдбар и тут идет подчет позиции контекстного меню
      if (containerTop && containerLeft && chatContainerEl) {
        const left =
          e.clientX - containerLeft + menuWidth > chatContainerEl.clientWidth
            ? e.clientX - containerLeft - menuWidth
            : e.clientX - containerLeft;

        const top =
          e.clientY - containerTop + menuHeight > chatContainerEl.clientHeight
            ? e.clientY - containerTop - menuHeight + 50
            : e.clientY - containerTop + 50;

        setModalPosition({ top, left });
      } else {
        // тут получаеться нету сайдбара и подсчет координат идет без него
        if (chatContainerEl) {
          const left =
            e.clientX + menuWidth > chatContainerEl.clientWidth
              ? e.clientX - menuWidth
              : e.clientX;

          const top =
            e.clientY + menuHeight > chatContainerEl.clientHeight
              ? e.clientY - menuHeight
              : e.clientY;

          setModalPosition({ top, left });
        }
      }
    }

    if (
      selectedDocDataMessage !== null &&
      selectedDocDataMessage.find(msg => msg.id === message.id) !== undefined
    ) {
      updateSelectedDocDataMessage(null);
    } else {
      updateSelectedDocDataMessage([message]);
    }
  };

  const handleToggleSelectedMessage = (message: DocumentData) => {
    if (selectedDocDataMessage?.find(msg => msg.id === message.id)) {
      updateSelectedDocDataMessage(prev => {
        const filteredMsgs = prev?.filter(msg => msg.id !== message.id);

        if (filteredMsgs?.length === 0) {
          return null;
        } else {
          return filteredMsgs ?? null;
        }
      });
    } else {
      updateSelectedDocDataMessage(prev =>
        prev === null ? [message] : [...prev, message]
      );
    }
  };

  const handleCloseModal = (e?: React.MouseEvent<HTMLDivElement>) => {
    if (
      e &&
      e.target instanceof Element &&
      e.target.id &&
      // selectedDocDataMessage &&
      // selectedDocDataMessage?.length !== 1 &&
      isSelectedMessages
    ) {
      return;
    }

    if (selectedDocDataMessage !== null) {
      resetSelectedMessages();
    }
  };

  const quickScrollBottom = () => {
    const list = msgListRef?.current;
    const lastMessage = list?.lastElementChild;
    if (list && lastMessage) {
      lastMessage.scrollIntoView({ block: 'end' });
    }
  };

  const scrollToBottom = () => {
    const list = msgListRef?.current;
    const lastMessage = list?.lastElementChild;
    if (list && lastMessage) {
      lastMessage.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  return (
    <>
      <div className="h-full w-full py-1" onClick={handleCloseModal}>
        <Scrollbars
          ref={scrollbarsRef}
          autoHide
          style={{
            top: 56,
            height: 'calc(100% - 56px - 96px)',
          }}
          onScroll={handleScroll}
          id="scrollbars"
        >
          <ul
            ref={msgListRef}
            className={`flex flex-col px-6 gap-2 ${
              !isLoadedContent && 'invisible'
            }`}
          >
            {groupedMessages &&
              Object.keys(groupedMessages).map(date => (
                <li
                  className={`relative flex flex-col ${
                    isSelectedMessages ? 'gap-0' : 'gap-2'
                  }`}
                  key={date}
                >
                  <div className="flex justify-center sticky top-1 z-10 ">
                    <p className="px-2 py-0.5 w-min-0 whitespace-no-wrap rounded-xl bg-zinc-200/40 text-green-100 text-center">
                      {formatDateForGroupMessages(date, t)}
                    </p>
                  </div>
                  {groupedMessages[date].map((message: DocumentData) => {
                    const currentItem = selectedDocDataMessage?.find(
                      msg => msg.id === message.id
                    );

                    return (
                      <div
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
                          isSelectedMessages &&
                          handleToggleSelectedMessage(message)
                        }
                        id="documentDataMsg"
                      >
                        {isSelectedMessages && currentItem ? (
                          <svg width={32} height={32} id="select">
                            <use
                              href={sprite + '#icon-select'}
                              fill="#FFFFFF"
                            />
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
                      </div>
                    );
                  })}
                </li>
              ))}
          </ul>
        </Scrollbars>

        <MessagesSkeleton isLoadedContent={isLoadedContent} />

        {isScrollDownButtonVisible && isLoadedContent && (
          <ButtonScrollDown
            scrollToBottom={scrollToBottom}
            lengthOfUnreadMsgs={lengthOfUnreadMsgs}
          />
        )}
      </div>
      {groupedMessages && selectedDocDataMessage && (
        <Suspense
          fallback={
            <div
              style={{
                position: 'absolute',
                top: modalPosition.top + 'px',
                left: modalPosition.left + 'px',
              }}
              className="z-50 w-screen h-screen bg-transparent pointer-events-none"
            >
              <div
                className={`w-56 h-56 p-2 bg-myBlackBcg rounded-3xl pointer-events-auto`}
              >
                <LoaderUIActions size={200} />
              </div>
            </div>
          }
        >
          <MessageContextMenuModal
            closeModal={handleCloseModal}
            modalPosition={modalPosition}
          >
            <ChatContextMenu groupedMessages={groupedMessages} />
          </MessageContextMenuModal>
        </Suspense>
      )}
    </>
  );
};

export default MessageList;
