import {
  useEffect,
  useState,
  useRef,
  FC,
  Suspense,
  lazy,
  useCallback,
} from 'react';
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

import MessagesScrollBar from './MessagesScrollBar/MessagesScrollBar';
import MessageList from './MessagesList/MessageList';
import MessagesSkeleton from './MessagesSkeleton/MessagesSkeleton';
import LoaderUIActions from '@components/LoaderUIActions/LoaderUIActions';
import ButtonScrollDown from '@components/Buttons/ButtonScrollDown/ButtonScrollDown';
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
import mergeChatMessages from '@utils/messages/mergeChatMessages';
import { IGroupedMessages } from '@interfaces/IGroupedMessages';
import '@i18n';

const Messages: FC = () => {
  const [groupedMessages, setGroupedMessages] =
    useState<IGroupedMessages | null>(null);
  const [lastLoadedMsg, setLastLoadedMsg] = useState<DocumentData | null>(null);
  const [isLoadedContent, setIsLoadedContent] = useState(false);
  const [isNearTop, setIsNearTop] = useState(false);
  const [isReadyFirstMsgs, setIsReadyFirstMsgs] = useState(false);
  const [isScrollDownButtonVisible, setIsScrollDownButtonVisible] =
    useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const scrollbarsRef = useRef<HTMLDivElement>(null);
  const msgListRef = useRef<HTMLDivElement>(null);
  const bottomElementRef = useRef<HTMLDivElement>(null);
  const handleScrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const isReadyToFetchFirstNewChatMsgs = useRef<boolean>(true);
  const isInfinityScrollLoading = useRef<boolean>(false);

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

  // console.log(
  //   groupedMessages,
  //   lastLoadedMsg,
  //   isLoadedContent,
  //   isNearTop,
  //   isReadyFirstMsgs,
  //   isScrollDownButtonVisible,
  //   chatUID,
  //   isSelectedMessages,
  //   lengthOfUnreadMsgs
  // );

  console.log('screen --> Messages');

  console.log('///////////////////////');

  // reset
  useEffect(() => {
    isReadyToFetchFirstNewChatMsgs.current = true;

    setGroupedMessages(null);
    setIsReadyFirstMsgs(false);
    setLastLoadedMsg(null);
    setIsNearTop(false);
  }, [chatUID]);

  // загрузка первого сообщения
  useEffect(() => {
    if (isReadyToFetchFirstNewChatMsgs.current === false) {
      return;
    }

    setIsLoadedContent(false);

    async function fetchFirstMsg() {
      console.log('**1 fetchFirstMsg');

      const queryParams = query(
        collection(db, `chats/${chatUID}/messages`),
        orderBy('date', 'desc'),
        limit(10)
      );

      getDocs(queryParams).then(snapshot => {
        if (!snapshot.empty) {
          const updatedMessages: DocumentData[] = snapshot.docs;
          const lastVisible = updatedMessages[updatedMessages.length - 1];

          setLastLoadedMsg(lastVisible);

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
          setIsReadyFirstMsgs(true);

          isReadyToFetchFirstNewChatMsgs.current = false;
        } else {
          setGroupedMessages({} as IGroupedMessages);
          setLastLoadedMsg(null);
          setIsReadyFirstMsgs(true);
        }
      });
    }

    fetchFirstMsg();
  }, [chatUID]);

  // infinite loading msgs
  useEffect(() => {
    if (chatUID === null || !isNearTop || !isReadyFirstMsgs || !lastLoadedMsg) {
      return;
    }

    if (isReadyToFetchFirstNewChatMsgs.current === true) {
      return;
    }

    const loadMoreMessages = async () => {
      if (isInfinityScrollLoading.current === false) {
        return;
      }

      console.log('==> 222 loadMoreMessages');

      const queryParams = query(
        collection(db, `chats/${chatUID}/messages`),
        orderBy('date', 'desc'),
        startAfter(lastLoadedMsg),
        limit(10)
      );

      const snapshot = await getDocs(queryParams);

      if (!snapshot.empty) {
        const updatedMessages: DocumentData[] = snapshot.docs;

        // console.log('33333 --------> updatedMessages', updatedMessages);

        const lastVisible = updatedMessages[updatedMessages.length - 1];

        setLastLoadedMsg(lastVisible);

        if (lastLoadedMsg?.id === lastVisible.id) {
          return;
        }

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

        setGroupedMessages(prev => {
          // console.log('prev', prev);
          // console.log('sortedData', sortedData);
          return mergeChatMessages(sortedData, prev as IGroupedMessages);
        });
      }
    };

    loadMoreMessages().then(() => (isInfinityScrollLoading.current = false));
  }, [chatUID, isNearTop, isReadyFirstMsgs, lastLoadedMsg]);

  // когда после самого верха сообщений в предидущем чате мы переходим на новый чат,
  //  то мы будем не внизу а на 10 сообщении(не внизу)
  useEffect(() => {
    if (isLoadedContent) {
      // setTimeout(() => {
      //   quickScrollBottom();
      // }, 100);\
      console.log('==11111111111');
      quickScrollBottom();
    }
  }, [isLoadedContent]);

  // на мобилке изза анимации 200мс не скроляться сообщения вниз
  useEffect(() => {
    const isMobileScreen = window.innerWidth <= 639;

    if (
      isLoadedContent &&
      isReadyFirstMsgs &&
      !isScrollDownButtonVisible &&
      isMobileScreen
    ) {
      setTimeout(() => {
        quickScrollBottom();
      }, 300);
    }
  }, [isLoadedContent, isReadyFirstMsgs, isScrollDownButtonVisible]);

  // еффект подскроливает сообщения если ты внизу
  useEffect(() => {
    if (!isScrollDownButtonVisible) {
      quickScrollBottom();
    }
  }, [groupedMessages, isScrollDownButtonVisible]);

  // после загрузки первых сообщений переводит флаг на true
  useEffect(() => {
    if (isReadyFirstMsgs) {
      setIsLoadedContent(true);
    }
  }, [isReadyFirstMsgs]);

  // добавляет msgs, изменяет msgs and удаляет msgs
  useEffect(() => {
    if (chatUID === null) return;

    const queryParams = query(
      collection(db, `chats/${chatUID}/messages`),
      orderBy('date', 'desc')
    );

    const unsubChatMessages = onSnapshot(queryParams, snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          if (snapshot.size !== 1 && snapshot.docChanges().length === 1) {
            const messageData = change.doc.data();
            if (messageData && messageData.date) {
              const date = messageData.date.toDate();
              const dateString = date.toISOString().split('T')[0];

              const obj = { [dateString]: [change.doc] };

              setGroupedMessages(prev => {
                console.log('add prev', prev);
                console.log('add obj', obj);
                return mergeChatMessages(prev as IGroupedMessages, obj);
              });
            }
          } else if (
            snapshot.size === 1 &&
            snapshot.docChanges().length === 1
          ) {
            const messageData = change.doc.data();
            if (messageData && messageData.date) {
              const date = messageData.date.toDate();
              const dateString = date.toISOString().split('T')[0];

              const obj = { [dateString]: [change.doc] };

              setGroupedMessages(prev =>
                mergeChatMessages(prev as IGroupedMessages, obj)
              );
            }
          }
        }
        if (change.type === 'modified') {
          if (
            (snapshot.size !== 1 && snapshot.docChanges().length === 1) ||
            (snapshot.size === 1 && snapshot.docChanges().length === 1)
          ) {
            const idDoc = change.doc.id;
            const messageData = change.doc.data();

            if (messageData && messageData.date) {
              const date = messageData.date.toDate();
              const dateString = date.toISOString().split('T')[0];

              setGroupedMessages(prev => {
                console.log('modified prev', prev);

                if (prev) {
                  const updatedMessages = { ...prev };

                  if (updatedMessages[dateString]) {
                    const index = updatedMessages[dateString].findIndex(
                      item => item.id === idDoc
                    );

                    if (index !== -1) {
                      updatedMessages[dateString] = [
                        ...updatedMessages[dateString].slice(0, index),
                        change.doc,
                        ...updatedMessages[dateString].slice(index + 1),
                      ];
                    }
                  }

                  return updatedMessages;
                } else {
                  return prev;
                }
              });
            }
          }
        }
        if (change.type === 'removed') {
          if (
            (snapshot.size !== 1 && snapshot.docChanges().length === 1) ||
            (snapshot.size === 1 && snapshot.docChanges().length === 1)
          ) {
            const idDoc = change.doc.id;
            const messageData = change.doc.data();

            if (messageData && messageData.date) {
              const date = messageData.date.toDate();
              const dateString = date.toISOString().split('T')[0];

              setGroupedMessages(prev => {
                console.log('removed prev', prev);
                if (prev) {
                  const updatedMessages = { ...prev };

                  if (updatedMessages[dateString]) {
                    updatedMessages[dateString] = updatedMessages[
                      dateString
                    ].filter(item => item.id !== idDoc);

                    // После фильтрации проверяем, остался ли массив пустым
                    if (updatedMessages[dateString].length === 0) {
                      // Если массив пуст, удаляем ключ из объекта
                      delete updatedMessages[dateString];
                    }
                  }

                  return updatedMessages;
                }

                return prev;
              });
            }
          }
        }
      });
    });

    return () => {
      unsubChatMessages();
    };
  }, [chatUID]);

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

  // Добавляет currentChatId в локалСторидж, чтобы при перезагрузке вернуться на текущий чат
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

  const handleScroll = useCallback(() => {
    const throttleTime = 100;

    if (handleScrollTimeout.current) {
      return;
    }

    handleScrollTimeout.current = setTimeout(() => {
      handleScrollTimeout.current = null;

      const scrollHeight = scrollbarsRef.current?.scrollHeight || 0;
      const clientHeight = scrollbarsRef.current?.clientHeight || 0;
      const scrollTop = scrollbarsRef.current?.scrollTop || 0;

      const isNearBottom = scrollHeight - scrollTop - clientHeight > 100;
      const top = scrollTop <= 500;

      if (top) {
        setIsNearTop(true);
        isInfinityScrollLoading.current = true;
      } else {
        setIsNearTop(false);
      }

      setIsScrollDownButtonVisible(isNearBottom);
    }, throttleTime);
  }, []);

  const handleClickRigthButtonMessage = useCallback(
    (message: DocumentData, e?: React.MouseEvent) => {
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
    },
    [
      isSelectedMessages,
      selectedDocDataMessage,
      updateIsSelectedMessages,
      updateSelectedDocDataMessage,
    ]
  );

  const handleToggleSelectedMessage = useCallback(
    (message: DocumentData) => {
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
    },
    [selectedDocDataMessage, updateSelectedDocDataMessage]
  );

  const handleCloseModal = (e?: React.MouseEvent<HTMLDivElement>) => {
    if (e && e.target instanceof Element && e.target.id && isSelectedMessages) {
      return;
    }

    if (selectedDocDataMessage !== null) {
      resetSelectedMessages();
    }
  };

  const quickScrollBottom = () => {
    console.log('quickScrollBottom');
    const bottomItemEl = document.getElementById('bottomItem');

    if (bottomItemEl) {
      bottomItemEl.scrollIntoView({ block: 'end' });
    }
  };

  const scrollToBottom = () => {
    const bottomItemEl = document.getElementById('bottomItem');

    if (bottomItemEl) {
      bottomItemEl.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  return (
    <>
      <div className="h-full w-full py-1" onClick={handleCloseModal}>
        <MessagesScrollBar
          scrollbarsRef={scrollbarsRef}
          handleScroll={handleScroll}
        >
          <MessageList
            msgListRef={msgListRef}
            bottomElementRef={bottomElementRef}
            groupedMessages={groupedMessages}
            isLoadedContent={isLoadedContent}
            isSelectedMessages={isSelectedMessages}
            selectedDocDataMessage={selectedDocDataMessage}
            handleClickRigthButtonMessage={handleClickRigthButtonMessage}
            handleToggleSelectedMessage={handleToggleSelectedMessage}
            isScrollDownButtonVisible={isScrollDownButtonVisible}
          />
        </MessagesScrollBar>

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
              className="z-50 w-screen h-screen bg-transparent pointer-events-none"
              style={{
                position: 'absolute',
                top: modalPosition.top + 'px',
                left: modalPosition.left + 'px',
              }}
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

export default Messages;
