import { useEffect, useState, useRef, FC } from 'react';
import {
  DocumentData,
  collection,
  deleteDoc,
  doc,
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

import MessageItem from '@components/Messages/MessageItem/MessageItem';
import MessageContextMenuModal from '@components/Modals/ModalMessageContextMenu/ModalMessageContextMenu';
import { db, storage } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import formatDateForGroupMessages from '@utils/formatDateForGroupMessages';
import sprite from '@assets/sprite.svg';
import '@i18n';

interface IGroupedMessages {
  [date: string]: DocumentData[];
}

const MessageList: FC = () => {
  const [groupedMessages, setGroupedMessages] =
    useState<IGroupedMessages | null>(null);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [selectedDocDataMessage, setSelectedDocDataMessage] =
    useState<DocumentData | null>(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const scrollbarsRef = useRef<Scrollbars>(null);
  const msgListRef = useRef(null);
  const { t } = useTranslation();

  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const { chatUID, userUID } = useChatStore(state => state.currentChatInfo);
  const updateEditingMessage = useChatStore(
    state => state.updateEditingMessage
  );

  // console.log('screen --> MessageList');

  useEffect(() => {
    if (chatUID === null) return;

    const queryParams = query(
      collection(db, `chats/${chatUID}/messages`),
      orderBy('date', 'asc')
    );

    const unsubChatMessages = onSnapshot(queryParams, snapshot => {
      // console.log(snapshot.docs);
      const updatedMessages: DocumentData[] = snapshot.docs;

      // Группировка сообщений по дате (та что sticky)
      const grouped = updatedMessages.reduce((acc, message) => {
        const messageData = message.data();
        if (messageData && messageData.date) {
          const date = messageData.date.toDate();
          const dateString = date.toISOString().split('T')[0];

          acc[dateString] = acc[dateString] || [];
          acc[dateString].push(message);
        }

        return acc;
      }, {});

      setGroupedMessages(grouped);
    });

    return () => {
      unsubChatMessages();
    };
  }, [chatUID, currentUserUID]);

  // Добавляет currentChatId в локалСторидж, чтобы при перезагрузке врнуться на текущий чат
  useEffect(() => {
    if (chatUID) {
      localStorage.setItem('currentChatId', chatUID);
    }

    return () => {
      localStorage.removeItem('currentChatId');
    };
  }, [chatUID]);

  // Измерение высоты ul - чата(размер ul с сообщениями) при его изменении
  useEffect(() => {
    const observer = new ResizeObserver(handleClickScrollBottom);
    const currentMsgListRef = msgListRef.current;

    if (currentMsgListRef) {
      observer.observe(currentMsgListRef);
    }

    return () => {
      if (currentMsgListRef) {
        observer.unobserve(currentMsgListRef);
      }
    };
  }, [msgListRef]);

  const handleClickScrollBottom = () => {
    if (scrollbarsRef.current) {
      scrollbarsRef.current.scrollToBottom();
    }
  };

  // надо тротл добавить чтобы не так часто срабатывало
  const handleScroll = () => {
    const scrollHeight = scrollbarsRef.current?.getScrollHeight() || 0;
    const clientHeight = scrollbarsRef.current?.getClientHeight() || 0;
    const scrollTop = scrollbarsRef.current?.getScrollTop() || 0;

    const isNearBottom = scrollHeight - scrollTop - clientHeight > 100;

    setIsButtonVisible(isNearBottom);
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

    if (selectedDocDataMessage?.id === message.id) {
      setSelectedDocDataMessage(null);
    } else {
      setSelectedDocDataMessage(message);
    }
  };

  const handleCloseModal = () => {
    if (selectedDocDataMessage !== null) setSelectedDocDataMessage(null);
  };

  const handleDeleteMessage = async () => {
    if (!groupedMessages) return;
    const mergedArray: DocumentData[] = Object.values(groupedMessages).reduce(
      (acc, currentArray) => acc.concat(currentArray),
      []
    );

    if (
      chatUID &&
      mergedArray &&
      selectedDocDataMessage !== null &&
      currentUserUID &&
      userUID &&
      selectedDocDataMessage
    ) {
      const arrayURLsOfFiles = selectedDocDataMessage?.data()?.file;

      if (arrayURLsOfFiles) {
        const promisesArrOfURLs = arrayURLsOfFiles.map(
          (el: { url: string }) => {
            const desertRef = ref(storage, el.url);

            return deleteObject(desertRef);
          }
        );

        await Promise.all(promisesArrOfURLs);
      }

      await deleteDoc(
        doc(db, 'chats', chatUID, 'messages', selectedDocDataMessage.id)
      ).then(() => {
        handleCloseModal();
      });

      // если последнее сообщение то ставим последнее сообщение messages[selectedItemIndexForOpenModal - 1]
      if (mergedArray.length > 1) {
        // тут в ифе по идее условие если последнее сообщение здесь
        if (
          selectedDocDataMessage.id === mergedArray[mergedArray.length - 1].id
        ) {
          const lastFiles = mergedArray[mergedArray.length - 2].data()?.file;

          const lastMessage = lastFiles
            ? `${String.fromCodePoint(128206)} ${lastFiles.length} file(s) ${
                mergedArray[mergedArray.length - 2].data().message
              }`
            : mergedArray[mergedArray.length - 2].data().message;

          const senderUserIDMessage =
            mergedArray[mergedArray.length - 2].data().senderUserID;

          const lastDateMessage =
            mergedArray[mergedArray.length - 2].data().date;

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
        }
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

    if (chatUID && mergedArray && selectedDocDataMessage !== null) {
      const editingMessageInfo = {
        selectedMessage: selectedDocDataMessage,
        isLastMessage:
          selectedDocDataMessage.id === mergedArray[mergedArray.length - 1].id
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
        >
          <ul ref={msgListRef} className="flex flex-col px-6 gap-2">
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
                      selectedDocDataMessage?.id === message.id;

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
                        <MessageItem msg={message} />
                      </div>
                    );
                  })}
                </li>
              ))}
          </ul>
        </Scrollbars>

        {isButtonVisible && (
          <button
            onClick={handleClickScrollBottom}
            className="absolute bottom-32 right-10 bg-white p-2 rounded-full"
          >
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
          </button>
        )}
      </div>
      {groupedMessages && selectedDocDataMessage !== null && (
        <MessageContextMenuModal
          closeModal={handleCloseModal}
          modalPosition={modalPosition}
        >
          <div className="w-56 h-56 p-2 bg-myBlackBcg rounded-3xl pointer-events-auto">
            {selectedDocDataMessage?.data()?.senderUserID ===
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

            {selectedDocDataMessage?.data()?.message && (
              <CopyToClipboard
                text={selectedDocDataMessage?.data()?.message}
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
