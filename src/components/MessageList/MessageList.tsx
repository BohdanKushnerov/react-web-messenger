import { useEffect, useState, useRef, FC, Suspense, lazy, memo } from 'react';
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

function mergeChatMessages(obj1: IGroupedMessages, obj2: IGroupedMessages) {
  const merged = { ...obj1 };

  for (const key in obj2) {
    if (merged[key]) {
      merged[key] = [...merged[key], ...obj2[key]];
    } else {
      merged[key] = obj2[key];
    }
  }

  return merged;
}

const MessageList: FC = memo(() => {
  const [groupedMessages, setGroupedMessages] =
    useState<IGroupedMessages | null>(null);
  const [lastLoadedMsg, setLastLoadedMsg] = useState<DocumentData | null>(null);
  const [isLoadedContent, setIsLoadedContent] = useState(false);
  const [isNearTop, setIsNearTop] = useState(false);
  const [isReadyFirstMsg, setIsReadyFirstMsg] = useState(false);
  const [isReadyLoadingNextMsgs, setIsReadyLoadingNextMsgs] = useState(false);

  const [isScrollDownButtonVisible, setIsScrollDownButtonVisible] =
    useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const scrollbarsRef = useRef<HTMLDivElement>(null);
  const msgListRef = useRef<HTMLUListElement>(null);
  const handleScrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const isReadyToFetch = useRef<boolean>(false);
  const isInfinityScrollLoading = useRef<boolean>(false);

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

  // console.log('groupedMessages', groupedMessages);
  // console.log('isNearTop', isNearTop);

  // useEffect(() => {
  //   // isReadyToFetch.current = false;
  //   return () => {
  //     if (isReadyToFetch.current === false && isNearTop) {
  //       console.log('................useEffect.......................');
  //       setIsNearTop(false);
  //     }
  //   };
  // }, [isNearTop]);

  useEffect(() => {
    return () => {
      // console.log('......unmount.......');
      isReadyToFetch.current = false;

      setGroupedMessages(null);
      setIsReadyFirstMsg(false);
      setIsReadyLoadingNextMsgs(false);
      setLastLoadedMsg(null);
      setIsNearTop(false);
      setIsLoadedContent(false);
    };
  }, [chatUID]);

  // загрузка первого сообщения
  useEffect(() => {
    if (isReadyToFetch.current === true) {
      return;
    }

    function fetchFirstMsg() {
      setIsReadyLoadingNextMsgs(false);
      console.log('************************************1 fetchFirstMsg');

      const queryParams = query(
        collection(db, `chats/${chatUID}/messages`),
        orderBy('date', 'desc'),
        limit(1)
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

          setGroupedMessages(groupedMsgs);
          setIsReadyFirstMsg(true);

          isReadyToFetch.current = true;
        } else {
          setGroupedMessages({} as IGroupedMessages);
          setLastLoadedMsg(null);
          setIsReadyFirstMsg(true);
          setIsLoadedContent(true);
        }
      });
    }

    fetchFirstMsg();
  }, [chatUID]);

  // загружает первых 10 сообщений в чате
  useEffect(() => {
    if (chatUID === null || !isReadyFirstMsg || !lastLoadedMsg) {
      return;
    }

    if (isReadyLoadingNextMsgs) {
      return;
    }

    if (isReadyToFetch.current === false) {
      return;
    }

    async function fetchFirstChatMsgs() {
      console.log('************************************2 fetchFirstChatMsgs');

      const queryParams = query(
        collection(db, `chats/${chatUID}/messages`),
        orderBy('date', 'desc'),
        startAfter(lastLoadedMsg),
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

          setGroupedMessages(prev => {
            return mergeChatMessages(sortedData, prev as IGroupedMessages);
          });
          setIsReadyLoadingNextMsgs(true);
        }
      });
    }

    fetchFirstChatMsgs().then(() => setIsLoadedContent(true));
  }, [chatUID, isReadyFirstMsg, isReadyLoadingNextMsgs, lastLoadedMsg]);

  // infinite loading msgs
  useEffect(() => {
    if (
      chatUID === null ||
      !isNearTop ||
      !isReadyFirstMsg ||
      !isReadyLoadingNextMsgs
    ) {
      return;
    }

    if (isReadyToFetch.current === false) {
      return;
    }

    console.log('////////////////////////////');

    const loadMoreMessages = async () => {
      console.log(chatUID, isNearTop, isReadyFirstMsg, isReadyLoadingNextMsgs);

      if (isInfinityScrollLoading.current === false) {
        return;
      }

      console.log('333 loadMoreMessages');

      // isInfinityScrollLoading.current = true;

      // isInfinityScrollLoading.current = true;

      const queryParams = query(
        collection(db, `chats/${chatUID}/messages`),
        orderBy('date', 'desc'),
        startAfter(lastLoadedMsg),
        limit(10)
      );

      const snapshot = await getDocs(queryParams);

      if (!snapshot.empty) {
        const updatedMessages: DocumentData[] = snapshot.docs;

        console.log('33333 --------> updatedMessages', updatedMessages);

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
    // loadMoreMessages();
    console.log('=======================================');
  }, [
    chatUID,
    isNearTop,
    isReadyFirstMsg,
    isReadyLoadingNextMsgs,
    lastLoadedMsg,
  ]);

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

  // авто скролл вниз при новом сообщении если я внизу списка
  // useEffect(() => {
  //   if (scrollbarsRef.current) {
  //     if (!isScrollDownButtonVisible && isLoadedContent) {
  //       const scrollHeight = scrollbarsRef.current?.scrollHeight || 0;
  //       const clientHeight = scrollbarsRef.current?.clientHeight || 0;
  //       const scrollTop = scrollbarsRef.current?.scrollTop || 0;

  //       const isNearBottom = scrollHeight - scrollTop - clientHeight < 200;

  //       if (isNearBottom) {
  //         scrollToBottom();
  //         console.log(111111111111111111);
  //       } else {
  //         quickScrollBottom();
  //         console.log(222222222222222222);
  //       }
  //     }
  //   }
  // }, [groupedMessages, isLoadedContent, isScrollDownButtonVisible]);

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

  const handleScroll = () => {
    const throttleTime = 100;

    console.log('handleScroll');

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
  };

  // еффект подскроливает сообщения если ты внизу
  useEffect(() => {
    if (!isScrollDownButtonVisible) {
      quickScrollBottom();
      // setIsNearTop(false);
    }
  }, [groupedMessages, isScrollDownButtonVisible]);

  // когда после самого верха сообщений в предидущем чате мы переходим на новый чат,
  //  то мы будем не внизу а на 10 сообщении(не внизу)
  useEffect(() => {
    if (isReadyLoadingNextMsgs) {
      console.log('.....qweqweqweqweqeqe');
      quickScrollBottom();
      // setIsNearTop(false);
    }
  }, [isReadyLoadingNextMsgs]);

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
              // overflow: 'scroll',
              overflowY: 'scroll',
            }}
            onScroll={handleScroll}
          >
            <ul
              ref={msgListRef}
              className={`flex flex-col px-6 gap-2 ${
                !isLoadedContent && 'invisible'
              }`}
              // className={`flex flex-col px-6 gap-2`}
              style={{
                minHeight: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
                // scrollBehavior: 'unset',
                // overflowY: 'scroll',
              }}
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
              {/* <div ref={bottomElementRef} className="h-0 w-0"></div> */}
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
});

export default MessageList;
