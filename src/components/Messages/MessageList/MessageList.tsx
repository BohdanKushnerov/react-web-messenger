import { useEffect, useState, useRef, FC, useLayoutEffect } from 'react';
import {
  DocumentData,
  Firestore,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useTranslation } from 'react-i18next';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';

import MessagesSkeleton from '../MessagesSkeleton/MessagesSkeleton';
import MessageItem from '@components/Messages/MessageItem/MessageItem';
import MessageContextMenuModal from '@components/Modals/ModalMessageContextMenu/ModalMessageContextMenu';
import { db, storage } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import useLengthOfMyUnreadMsgs from '@hooks/useLengthOfMyUnreadMsgs';
import formatDateForGroupMessages from '@utils/formatDateForGroupMessages';
import { IGroupedMessages } from '@interfaces/IGroupedMessages';
import { IFile } from '@interfaces/IFile';
import sprite from '@assets/sprite.svg';
import '@i18n';

const MessageList: FC = () => {
  const [groupedMessages, setGroupedMessages] =
    useState<IGroupedMessages | null>(null);
  const [isScrollDownButtonVisible, setIsScrollDownButtonVisible] =
    useState(false);
  const [selectedDocDataMessage, setSelectedDocDataMessage] = useState<
    DocumentData[] | null
  >(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [isLoadedContent, setIsLoadedContent] = useState(false);
  const scrollbarsRef = useRef<Scrollbars>(null);
  const msgListRef = useRef<HTMLUListElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { t } = useTranslation();

  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const { chatUID, userUID } = useChatStore(state => state.currentChatInfo);
  const updateEditingMessage = useChatStore(
    state => state.updateEditingMessage
  );

  const length = useLengthOfMyUnreadMsgs(
    [chatUID, { lastMessage: '', senderUserID: '', userUID: '' }],
    false
  );

  // console.log('screen --> MessageList');

  // еффект ждет пока загрузятся фотки на странице, чтобы не было скачков,
  // далее таймаут чтобы успели попасть в дом дерево и уже там по селектору взять их
  // и посмотреть на их load
  useLayoutEffect(() => {
    // Проверяем, был ли таймер уже запущен
    if (
      !isLoadedContent &&
      groupedMessages &&
      msgListRef.current &&
      !timeoutRef.current
    ) {
      // scrollToBottom();
      quickScrollBottom();

      timeoutRef.current = setTimeout(() => {
        const imagesInMessages = msgListRef?.current?.querySelectorAll('img');
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
                .then(() => quickScrollBottom())
                .then(() => setIsLoadedContent(true));

              // scrollToBottom();
            } catch (error) {
              console.error('Error loading images:', error);
            }
          };

          loadAllImages(imagesInMessages);
        } else {
          // если нету фото делаем скролл вниз
          // scrollToBottom();
          quickScrollBottom();
          setIsLoadedContent(true);
        }
      }, 250);
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
      if (!isScrollDownButtonVisible) {
        scrollToBottom();
        // console.log('==========================етот скролл работает');
      }
    }
  }, [groupedMessages, isScrollDownButtonVisible]);

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
      // console.log('snapshot.metadata', snapshot.metadata);
      // console.log('snapshot.docs', snapshot.docs);
      // if (snapshot.metadata.fromCache === false) {
      // console.log('snapshot', snapshot.metadata.fromCache);
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

      // }
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

      const chatContainerEl =
        e.currentTarget.parentElement?.parentElement?.parentElement;
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

    // if (selectedDocDataMessage?.id === message.id) {
    //   setSelectedDocDataMessage(null);
    // } else {
    //   setSelectedDocDataMessage(message);
    // }

    // console.log(selectedDocDataMessage.find(msg => msg.id === message.id));

    if (
      selectedDocDataMessage !== null &&
      selectedDocDataMessage.find(msg => msg.id === message.id) !== undefined
    ) {
      console.log('очистим');
      setSelectedDocDataMessage(null);
    } else {
      console.log('добавим ');

      setSelectedDocDataMessage(prev =>
        prev === null ? [message] : [...prev, message]
      );
      // setSelectedDocDataMessage([...message]);
    }
  };

  console.log('selectedDocDataMessage', selectedDocDataMessage);

  const handleCloseModal = () => {
    if (selectedDocDataMessage !== null) setSelectedDocDataMessage(null);
    // if (selectedDocDataMessage !== null) {
    //   console.log('handleCloseModal');
    //   // setSelectedDocDataMessage([]);
    // }
  };

  async function deleteFilesAndDocs(
    selectedDocDataMessage: DocumentData[],
    db: Firestore,
    chatUID: string
  ) {
    await Promise.all(
      selectedDocDataMessage.map(async msg => {
        const arrayURLsOfFiles = msg.data()?.file;

        if (arrayURLsOfFiles) {
          const promisesArrOfURLs = arrayURLsOfFiles.map((el: IFile) => {
            const desertRef = ref(storage, el.url);
            return deleteObject(desertRef);
          });

          await Promise.all(promisesArrOfURLs);
        }

        await deleteDoc(doc(db, 'chats', chatUID, 'messages', msg.id));
      })
    );
  }

  async function getLastMessage(chatUID: string) {
    const queryParams = query(
      collection(db, `chats/${chatUID}/messages`),
      orderBy('date', 'desc'), // Сортируем по убыванию даты, чтобы получить последнее сообщение
      limit(1) // Ограничиваем результат одним документом
    );

    const querySnapshot = await getDocs(queryParams);

    if (querySnapshot.empty) {
      console.log('No messages');
      return null;
    }

    // Получаем последний документ из результатов запроса
    const lastMessage = querySnapshot.docs[0];
    const lastMessageData = lastMessage.data();
    console.log('Last message:', lastMessageData);
    return lastMessageData;
  }

  const handleDeleteMessage = async () => {
    if (
      chatUID &&
      selectedDocDataMessage !== null &&
      currentUserUID &&
      userUID &&
      selectedDocDataMessage
    ) {
      await deleteFilesAndDocs(selectedDocDataMessage, db, chatUID).then(() => {
        handleCloseModal();
      });

      const lastMessageFromStorage = await getLastMessage(chatUID);

      if (lastMessageFromStorage) {
        const lastFiles = lastMessageFromStorage.file;

        const lastMessage = lastFiles
          ? `${String.fromCodePoint(128206)} ${lastFiles.length} file(s) ${
              lastMessageFromStorage.message
            }`
          : lastMessageFromStorage.message;

        const senderUserIDMessage = lastMessageFromStorage.senderUserID;

        const lastDateMessage = lastMessageFromStorage.date;

        // здесь надо переписывать последнее сообщение мне и напарнику после удаления
        await updateDoc(doc(db, 'userChats', currentUserUID), {
          [chatUID + '.lastMessage']: lastMessage,
          [chatUID + '.senderUserID']: senderUserIDMessage,
          [chatUID + '.date']: lastDateMessage,
        });

        // =====================================================
        await updateDoc(doc(db, 'userChats', userUID), {
          [chatUID + '.lastMessage']: lastMessage,
          [chatUID + '.senderUserID']: senderUserIDMessage,
          [chatUID + '.date']: lastDateMessage,
        });
      } else {
        // пустую строку с пробелом чтобы не падала ошибка

        await updateDoc(doc(db, 'userChats', currentUserUID), {
          [chatUID + '.lastMessage']: ' ',
          [chatUID + '.senderUserID']: ' ',
          [chatUID + '.date']: ' ',
        });
        // =====================================================
        await updateDoc(doc(db, 'userChats', userUID), {
          [chatUID + '.lastMessage']: ' ',
          [chatUID + '.senderUserID']: ' ',
          [chatUID + '.date']: ' ',
        });
      }

      toast.success(t('Toasts.DeleteMessageSuccess'));

      const inputElement = document.getElementById('chatFormInput')!;
      inputElement.focus();
    }
  };

  const handleChooseEditMessage = () => {
    if (!groupedMessages) return;
    const mergedArray: DocumentData[] = Object.values(groupedMessages).reduce(
      (acc, currentArray) => acc.concat(currentArray),
      []
    );

    if (
      chatUID &&
      mergedArray &&
      selectedDocDataMessage &&
      selectedDocDataMessage.length === 1
    ) {
      const editingMessageInfo = {
        selectedMessage: selectedDocDataMessage[0],
        isLastMessage:
          selectedDocDataMessage[0].id ===
          mergedArray[mergedArray.length - 1].id
            ? true
            : false,
      };

      updateEditingMessage(editingMessageInfo);
      handleCloseModal();

      const inputElement = document.getElementById('chatFormInput')!;
      inputElement.focus();
    }
  };

  const handleSuccessClickCopyTextMsg = () => {
    toast.success(t('Toasts.CopyToClipboard'));
    handleCloseModal();

    const inputElement = document.getElementById('chatFormInput')!;
    inputElement.focus();
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
      // lastMessage.scrollIntoView();
    }
  };

  const textFromSelectedMsgs = () => {
    if (selectedDocDataMessage?.length) {
      // const allText = selectedDocDataMessage.reduce((acc, msg) => {
      //   return acc + ' ' + msg.data().message;
      // }, '');
      const allText = selectedDocDataMessage
        .map(msg => msg.data().message)
        .join(' ');

      console.log('allText', allText);
      return allText;
    }
    // else {
    //   return '========================';
    // }
  };

  return (
    <>
      <div className="relative h-full w-full py-1" onClick={handleCloseModal}>
        <Scrollbars
          ref={scrollbarsRef}
          autoHide
          style={{
            top: 56,
            height: 'calc(100% - 56px - 96px)',
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
                <li className="relative flex flex-col gap-2" key={date}>
                  <div className="flex justify-center sticky top-1 z-10 ">
                    <p className="px-2 py-0.5 w-min-0 whitespace-no-wrap rounded-xl bg-zinc-200/40 text-green-100 text-center">
                      {formatDateForGroupMessages(date, t)}
                    </p>
                  </div>
                  {groupedMessages[date].map((message: DocumentData) => {
                    const currentItem =
                      // selectedDocDataMessage?.id === message.id;
                      selectedDocDataMessage?.find(
                        msg => msg.id === message.id
                      );

                    return (
                      <div
                        className={`flex justify-center p-0.5 rounded-xl ${
                          currentItem && 'bg-currentContextMenuMessage'
                        }`}
                        key={message.id}
                        onContextMenu={e =>
                          handleClickRigthButtonMessage(message, e)
                        }
                      >
                        <MessageItem
                          msg={message}
                          isNearBottom={!isScrollDownButtonVisible}
                        />
                      </div>
                    );
                  })}
                </li>
              ))}
          </ul>
        </Scrollbars>

        {!isLoadedContent && <MessagesSkeleton scrollbarsRef={scrollbarsRef} />}

        {isScrollDownButtonVisible && isLoadedContent && (
          <button
            className="absolute bottom-32 right-10 bg-white p-2 rounded-full"
            onClick={scrollToBottom}
          >
            <div className="relative">
              <svg
                className="rotate-180"
                strokeWidth="0"
                viewBox="0 0 320 512"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"></path>
              </svg>
              {length > 0 && (
                <span className="absolute bottom-0 right-0 transform translate-x-4 -mb-4 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                  {length}
                </span>
              )}
            </div>
          </button>
          // <button
          //   onClick={scrollToBottom}
          //   className="absolute bottom-32 right-10 bg-white p-2 rounded-full "
          // >
          //   <svg
          //     className="rotate-180"
          //     strokeWidth="0"
          //     viewBox="0 0 320 512"
          //     height="24"
          //     width="24"
          //     xmlns="http://www.w3.org/2000/svg"
          //   >
          //     <path d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"></path>
          //   </svg>
          // </button>
        )}
      </div>
      {groupedMessages && selectedDocDataMessage !== null && (
        <MessageContextMenuModal
          closeModal={handleCloseModal}
          modalPosition={modalPosition}
        >
          <div className="w-56 h-56 p-2 bg-myBlackBcg rounded-3xl pointer-events-auto">
            {selectedDocDataMessage &&
              selectedDocDataMessage[0]?.data()?.senderUserID ===
                currentUserUID && (
                <button
                  className="flex items-center justify-between w-full px-8 py-2 text-white hover:cursor-pointer hover:bg-hoverGray hover:rounded-md"
                  onClick={handleChooseEditMessage}
                >
                  <svg width={20} height={20}>
                    <use href={sprite + '#icon-pencil'} fill="#FFFFFF" />
                  </svg>
                  <span>{t('ContextMenu.Edit')}</span>
                </button>
              )}

            {selectedDocDataMessage && (
              <CopyToClipboard
                // text={selectedDocDataMessage?.data()?.message}
                text={textFromSelectedMsgs() || ''}
                onCopy={handleSuccessClickCopyTextMsg}
              >
                <button className="flex items-center justify-between w-full px-8 py-2 text-white hover:cursor-pointer hover:bg-hoverGray hover:rounded-md">
                  <svg width={20} height={20}>
                    <use href={sprite + '#icon-copy'} fill="#FFFFFF" />
                  </svg>
                  <span>{t('ContextMenu.Copy')}</span>
                </button>
              </CopyToClipboard>
            )}

            <button
              className="flex items-center justify-between w-full px-8 py-2 text-white hover:cursor-pointer hover:bg-hoverGray hover:rounded-md"
              onClick={handleDeleteMessage}
            >
              <svg width={20} height={20}>
                <use href={sprite + '#icon-delete-button'} fill="#FFFFFF" />
              </svg>
              <span>{t('ContextMenu.Delete')}</span>
            </button>
          </div>
        </MessageContextMenuModal>
      )}
    </>
  );
};

export default MessageList;
