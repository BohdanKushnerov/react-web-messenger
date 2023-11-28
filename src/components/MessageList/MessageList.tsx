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
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';

import MessageItem from '@components/MessageItem/MessageItem';
import MessageContextMenuModal from '@components/Modals/ModalMessageContextMenu/ModalMessageContextMenu';
import { db, storage } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import sprite from '@assets/sprite.svg';

const MessageList: FC = () => {
  const [messages, setMessages] = useState<DocumentData[] | null>(null);
  const [groupedMessages, setGroupedMessages] = useState<DocumentData | null>(
    null
  );
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [selectedItemIdForOpenModal, setSelectedItemIdForOpenModal] = useState<
    string | null
  >(null);
  // const [selectedItemIndexForOpenModal, setSelectedItemIndexForOpenModal] =
  //   useState<number | null>(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const scrollbarsRef = useRef<Scrollbars>(null);
  const msgListRef = useRef(null);

  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const { chatUID, userUID } = useChatStore(state => state.currentChatInfo);
  const updateEditingMessage = useChatStore(
    state => state.updateEditingMessage
  );

  // console.log('screen --> MessageList');

  console.log('groupedMessages', groupedMessages);

  const selectedDocDataMessage = messages?.find(
    message => message.id === selectedItemIdForOpenModal
  );

  useEffect(() => {
    // Группировка сообщений по дате
    if (messages) {
      // console.log('messages', messages);
      const grouped = messages.reduce((acc, message) => {
        // Проверка на существование timestamp
        const messageData = message.data();
        // console.log('111', messageData);
        if (messageData && messageData.date) {
          const date = messageData.date.toDate(); // Преобразуем _Timestamp в объект Date
          const dateString = date.toISOString().split('T')[0]; // Получаем строку в формате 'YYYY-MM-DD'

          acc[dateString] = acc[dateString] || [];
          // acc[dateString].push(messageData);
          acc[dateString].push(message);
        }

        return acc;
      }, {});

      // console.log('grouped', grouped);
      setGroupedMessages(grouped);
    }
  }, [messages]);

  useEffect(() => {
    if (chatUID === null) return;

    localStorage.setItem('currentChatId', chatUID);

    const queryParams = query(
      collection(db, `chats/${chatUID}/messages`),
      orderBy('date', 'asc')
    );

    onSnapshot(queryParams, snapshot => {
      // if (!snapshot.empty) {
      //   if(!messages) {
      //     console.log('1111111111111111111111111111111111111111111111')
      //     setMessages(snapshot.docs);
      //   }
      // }
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          // console.log('New mes: ', change.doc.data());
          // if(messages) {
          //   setMessages([change.doc]);
          // } else {
          //   setMessages(prev => [...prev, change.doc]);
          // }
          // console.log('change', change.doc.data());

          if (
            change.doc.data().senderUserID !== currentUserUID &&
            change.doc.data().isRead === false
          ) {
            // new Notification('new Message', {
            //   body: change.doc.data().message,
            // });
          }
        }
        if (change.type === 'modified') {
          // console.log('Modified mes: ', change.doc.data());
        }
        if (change.type === 'removed') {
          // console.log('Removed mes: ', change.doc.data());
        }
      });
    });

    const unsubChatMessages = onSnapshot(queryParams, querySnapshot => {
      setMessages(querySnapshot.docs);
    });

    return () => {
      unsubChatMessages();
      localStorage.removeItem('currentChatId');
    };
  }, [chatUID, currentUserUID]);

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
    // index: number,
    id: string,
    e?: React.MouseEvent
  ) => {
    if (e) {
      e.preventDefault();

      // const chatContainerEl = e.currentTarget.parentElement?.parentElement;
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

    // if (selectedItemIndexForOpenModal === index) {
    //   setSelectedItemIndexForOpenModal(null);
    // } else {
    //   setSelectedItemIndexForOpenModal(index);
    // }
    if (selectedItemIdForOpenModal === id) {
      setSelectedItemIdForOpenModal(null);
    } else {
      setSelectedItemIdForOpenModal(id);
    }
  };

  const handleCloseModal = () => {
    if (selectedItemIdForOpenModal !== null)
      setSelectedItemIdForOpenModal(null);
  };

  const handleDeleteMessage = async () => {
    if (
      chatUID &&
      messages &&
      selectedItemIdForOpenModal !== null &&
      currentUserUID &&
      userUID &&
      selectedDocDataMessage
    ) {
      // const selectedDocDataMessage = messages.find(
      //   message => message.id === selectedItemIdForOpenModal
      // );

      const arrayURLsOfFiles = selectedDocDataMessage?.data()?.file;

      // const arrayURLsOfFiles =
      //   messages[selectedItemIndexForOpenModal].data()?.file;

      if (arrayURLsOfFiles) {
        const promisesArrOfURLs = arrayURLsOfFiles.map(
          (el: { url: string }) => {
            console.log(el.url);
            const desertRef = ref(storage, el.url);

            return deleteObject(desertRef).then(() =>
              console.log('delete URL success')
            );
          }
        );

        await Promise.all(promisesArrOfURLs).then(() =>
          console.log('delete All URLs success')
        );
      }

      await deleteDoc(
        doc(
          db,
          'chats',
          chatUID,
          'messages',
          // messages[selectedItemIndexForOpenModal].id
          selectedDocDataMessage.id
        )
      ).then(() => {
        handleCloseModal();
      });

      // если последнее сообщение то ставим последнее сообщение messages[selectedItemIndexForOpenModal - 1]
      if (messages.length > 1) {
        console.log('messages.length > 1');
        // тут в ифе по идее условие если последнее сообщение здесь
        // if (selectedItemIndexForOpenModal === messages.length - 1) {
        console.log(
          'selectedDocDataMessage.data().id',
          selectedDocDataMessage.id
        );
        console.log(
          'messages[messages.length - 1].data().id',
          messages[messages.length - 1].id
        );
        if (selectedDocDataMessage.id === messages[messages.length - 1].id) {
          console.log(
            'selectedDocDataMessage.data().id === messages[messages.length - 1].data().id'
          );
          // return;
          const lastFiles =
            // messages[selectedItemIndexForOpenModal - 1].data()?.file;
            messages[messages.length - 2].data()?.file;

          const lastMessage = lastFiles
            ? `${String.fromCodePoint(128206)} ${lastFiles.length} file(s) ${
                // messages[selectedItemIndexForOpenModal - 1].data().message
                messages[messages.length - 2].data().message
              }`
            : // : messages[selectedItemIndexForOpenModal - 1].data().message;
              messages[messages.length - 2].data().message;

          const senderUserIDMessage =
            // messages[selectedItemIndexForOpenModal - 1].data().senderUserID;
            messages[messages.length - 2].data().senderUserID;

          const lastDateMessage =
            // messages[selectedItemIndexForOpenModal - 1].data().date;
            messages[messages.length - 2].data().date;

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
        console.log('messages.length < 1');
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
    }
  };

  const handleChooseEditMessage = () => {
    if (chatUID && messages && selectedItemIdForOpenModal !== null) {
      // const selectedMessage = messages[selectedItemIndexForOpenModal];
      const selectedMessage: DocumentData | undefined = messages.find(
        message => message.id === selectedItemIdForOpenModal
      );

      // console.log(selectedMessage.id === messages[messages.length - 1].id);
      const editingMessageInfo = {
        selectedMessage,
        isLastMessage:
          // selectedItemIndexForOpenModal === messages.length - 1 ? true : false,
          selectedMessage?.id === messages[messages.length - 1].id
            ? true
            : false,
      };

      updateEditingMessage(editingMessageInfo);
      handleCloseModal();
    }
  };

  const handleSuccessClickCopyTextMsg = () => {
    toast.success('Copied to Clipboard!');
    handleCloseModal();
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
          <ul ref={msgListRef} className="flex flex-col px-6">
            {groupedMessages &&
              Object.keys(groupedMessages).map(date => (
                <li key={date}>
                  <div className="text-green-100">{date}</div>
                  {groupedMessages[date].map((message: DocumentData) => {
                    // console.log('message', message.id);
                    const currentItem =
                      selectedItemIdForOpenModal === message.id;

                    return (
                      // <div key={message.uid} className="message">
                      //   <div className="text-white">{message.message}</div>
                      // </div>
                      <div
                        className={`flex justify-center p-0.5 rounded-xl ${
                          currentItem && 'bg-currentContextMenuMessage'
                        }`}
                        onContextMenu={e =>
                          // handleClickRigthButtonMessage(index, e)
                          handleClickRigthButtonMessage(message.id, e)
                        }
                      >
                        <MessageItem msg={message} />
                      </div>
                    );
                  })}
                </li>
              ))}

            {/* {messages &&
              messages.map((msg, index) => {
                // console.log(msg)
                const currentItem = selectedItemIndexForOpenModal === index;

                return (
                  <li
                    key={msg.id}
                    className={`flex justify-center p-0.5 rounded-xl ${
                      currentItem && 'bg-currentContextMenuMessage'
                    }`}
                    onContextMenu={e => handleClickRigthButtonMessage(index, e)}
                  >
                    <MessageItem msg={msg} />
                  </li>
                );
              })} */}
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
      {messages && selectedItemIdForOpenModal !== null && (
        <MessageContextMenuModal
          closeModal={handleCloseModal}
          modalPosition={modalPosition}
        >
          <div className="w-56 h-56 p-2 bg-myBlackBcg rounded-3xl pointer-events-auto">
            {/* {messages[selectedItemIndexForOpenModal]?.data()?.senderUserID ===
              currentUserUID && ( */}
            {selectedDocDataMessage?.data()?.senderUserID ===
              currentUserUID && (
              <button
                className="flex items-center justify-between w-full px-8 py-2 text-white hover:cursor-pointer hover:bg-hoverGray hover:rounded-md"
                onClick={handleChooseEditMessage}
              >
                <svg width={20} height={20}>
                  <use href={sprite + '#icon-pencil'} fill="#FFFFFF" />
                </svg>
                <span>EDIT</span>
              </button>
            )}

            {/* {messages[selectedItemIndexForOpenModal]?.data()?.message && ( */}
            {selectedDocDataMessage?.data()?.message && (
              <CopyToClipboard
                text={selectedDocDataMessage?.data()?.message}
                onCopy={handleSuccessClickCopyTextMsg}
              >
                <button className="flex items-center justify-between w-full px-8 py-2 text-white hover:cursor-pointer hover:bg-hoverGray hover:rounded-md">
                  <svg width={20} height={20}>
                    <use href={sprite + '#icon-copy'} fill="#FFFFFF" />
                  </svg>
                  <span>COPY TEXT</span>
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
              <span>DELETE</span>
            </button>
          </div>
        </MessageContextMenuModal>
      )}
    </>
  );
};

export default MessageList;
