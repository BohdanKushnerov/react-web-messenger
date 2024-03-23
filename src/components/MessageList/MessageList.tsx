import { useEffect, useState, useRef, FC, Suspense, lazy } from 'react';
import {
  DocumentData,
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';
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

function mergeObjects(obj1, obj2) {
  const merged = { ...obj1 }; // Создаем копию первого объекта

  for (const key in obj2) {
    if (merged[key]) {
      // Если ключ существует в первом объекте, объединяем массивы
      merged[key] = [...merged[key], ...obj2[key]];
    } else {
      // Если ключ не существует в первом объекте, добавляем его
      merged[key] = obj2[key];
    }
  }

  return merged;
}

const MessageList: FC = () => {
  const [groupedMessages, setGroupedMessages] =
    useState<IGroupedMessages | null>(null);
  const [isScrollDownButtonVisible, setIsScrollDownButtonVisible] =
    useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [isLoadedContent, setIsLoadedContent] = useState(false);
  const [isNearTop, setIsNearTop] = useState(false);
  // const [isStartListen, setIsStartListen] = useState(false);
  const [lastVisibleMsg, setLastVisibleMsg] = useState<DocumentData | null>(
    null
  );
  const scrollbarsRef = useRef<HTMLDivElement>(null);

  const msgListRef = useRef<HTMLUListElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef2 = useRef<NodeJS.Timeout | null>(null);
  const isReadyListenMsgs = useRef<boolean | null>(null);
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
    false
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

  // еффект ждет пока загрузятся контент на странице, чтобы не было скачков,
  useEffect(() => {
    // Проверяем, был ли таймер уже запущен
    if (!isLoadedContent && groupedMessages && !timeoutRef.current) {
      timeoutRef.current = setTimeout(() => {
        quickScrollBottom();
        setIsLoadedContent(true);
      }, 300);
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
        const scrollHeight = scrollbarsRef.current?.scrollHeight || 0;
        const clientHeight = scrollbarsRef.current?.clientHeight || 0;
        const scrollTop = scrollbarsRef.current?.scrollTop || 0;

        const isNearBottom = scrollHeight - scrollTop - clientHeight < 200;

        if (isNearBottom) {
          scrollToBottom();
        } else {
          quickScrollBottom();
        }
      }
    }
  }, [groupedMessages, isLoadedContent, isScrollDownButtonVisible]);

  // скелетон сообщений
  useEffect(() => {
    isReadyListenMsgs.current = null;
    setIsLoadedContent(false);

    return () => {
      setIsLoadedContent(false);
    };
  }, [chatUID]);

  useEffect(() => {
    if (chatUID === null) return;

    function fetchStartsMsgs() {
      const queryParams = query(
        collection(db, `chats/${chatUID}/messages`),
        orderBy('date', 'desc'),
        limit(10)
      );

      getDocs(queryParams)
        .then(snapshot => {
          if (!snapshot.empty) {
            const updatedMessages: DocumentData[] = snapshot.docs;

            console.log(updatedMessages);

            const lastVisible = updatedMessages[updatedMessages.length - 1];
            setLastVisibleMsg(lastVisible);

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

            const entries = Object.entries(groupedMsgs);
            entries.forEach(arr => arr[1].reverse());
            entries.sort(
              ([dateA], [dateB]) =>
                new Date(dateA).getTime() - new Date(dateB).getTime()
            );

            const sortedData = Object.fromEntries(entries);

            setGroupedMessages(sortedData);
          }
        })
        .then(() => (isReadyListenMsgs.current = true));
    }

    fetchStartsMsgs();
  }, [chatUID]);

  //=========================================================
  useEffect(() => {
    if (chatUID === null) return;

    const queryParams = query(
      collection(db, `chats/${chatUID}/messages`),
      orderBy('date', 'desc')
    );

    const unsubChatMessages = onSnapshot(queryParams, snapshot => {
      // console.log(snapshot.docChanges().length);
      // console.log(snapshot.size);
      // console.log(snapshot.docChanges() === snapshot.size);
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          if (snapshot.size !== 1 && snapshot.docChanges().length === 1) {
            console.log('New msg: ', change.doc.data());
          }
        }
        if (change.type === 'modified') {
          console.log('Modified msg: ', change.doc.data());
        }
        if (change.type === 'removed') {
          console.log('Removed msg: ', change.doc.data());
        }
      });
    });

    return () => {
      unsubChatMessages();
    };
  }, [chatUID]);
  //=========================================================

  useEffect(() => {
    if (chatUID && isNearTop && lastVisibleMsg && isLoadedContent) {
      console.log('inside load moreeeeeeeeeeeeeeeeeeeeeeeeeeeee');

      const loadMoreMessages = async () => {
        console.log('=================================');

        const queryParams = query(
          collection(db, `chats/${chatUID}/messages`),
          orderBy('date', 'desc'),
          startAfter(lastVisibleMsg),
          limit(10)
        );

        const snapshot = await getDocs(queryParams);

        if (!snapshot.empty) {
          const updatedMessages: DocumentData[] = snapshot.docs;

          const lastVisible = updatedMessages[updatedMessages.length - 1];
          setLastVisibleMsg(lastVisible);

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

          const entries = Object.entries(groupedMsgs);
          entries.forEach(arr => arr[1].reverse());
          entries.sort(
            ([dateA], [dateB]) =>
              new Date(dateA).getTime() - new Date(dateB).getTime()
          );
          const sortedData = Object.fromEntries(entries);

          setGroupedMessages(prev => mergeObjects(sortedData, prev));
          setIsNearTop(false);
        }
      };

      loadMoreMessages();
    }
  }, [chatUID, isLoadedContent, isNearTop, lastVisibleMsg]);
  //=========================================================

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
    // Throttle time in milliseconds
    const throttleTime = 300;

    // If already throttled, ignore
    if (timeoutRef2.current) {
      return;
    }

    // Set a timeout to reset the throttling after throttleTime milliseconds
    timeoutRef2.current = setTimeout(() => {
      timeoutRef2.current = null;

      const scrollHeight = scrollbarsRef.current?.scrollHeight || 0;
      const clientHeight = scrollbarsRef.current?.clientHeight || 0;
      const scrollTop = scrollbarsRef.current?.scrollTop || 0;

      const isNearBottom = scrollHeight - scrollTop - clientHeight > 100;

      const top = scrollTop <= 100;

      console.log('scrollHeight', scrollHeight);
      console.log('clientHeight', clientHeight);
      console.log('scrollTop', scrollTop);

      // console.log('top in handler', top);

      top ? setIsNearTop(true) : setIsNearTop(false);

      setIsScrollDownButtonVisible(isNearBottom);
    }, throttleTime);
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
    if (e && e.target instanceof Element && e.target.id && isSelectedMessages) {
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
        <div
          style={{
            marginTop: 56,
            width: '100%',
            height: 'calc(100% - 152px)',
            overflow: 'hidden',
          }}
        >
          <div
            id="scrollbars"
            ref={scrollbarsRef}
            style={{
              width: '100%',
              height: '100%',
              overflow: 'scroll',
            }}
            onScroll={handleScroll}
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
          </div>
        </div>

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
