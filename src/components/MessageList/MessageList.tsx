import { useEffect, useState, useRef } from 'react';
// import { DocumentData, Firestore, doc, updateDoc } from 'firebase/firestore';
import { DocumentData, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Scrollbars } from 'react-custom-scrollbars-2';

// import { db } from '@myfirebase/config';
// import useChatStore from '@zustand/store';
// import formatTime from '@utils/formatTime';
import MessageItem from '@components/MessageItem/MessageItem';
import MessageContextMenuModal from '@components/ModalMessageContextMenu/ModalMessageContextMenu';
import { db } from '@myfirebase/config';
import useChatStore from '@zustand/store';

interface iMessageListProps {
  messages: DocumentData[] | null;
}

function MessageList({ messages }: iMessageListProps) {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [selectedItemIndexForOpenModal, setSelectedItemIndexForOpenModal] =
    useState<number | null>(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const scrollbarsRef = useRef<Scrollbars>(null);

  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const { chatUID, userUID } = useChatStore(state => state.currentChatInfo);

  useEffect(() => {
    handleClickScrollBottom();
  }, [messages]);

  const handleClickScrollBottom = () => {
    if (scrollbarsRef.current) {
      scrollbarsRef.current.scrollToBottom();
    }
  };

  // надо тротл добавить чтобі не так часто срабатывало
  const handleScroll = () => {
    const scrollHeight = scrollbarsRef.current?.getScrollHeight() || 0;
    const clientHeight = scrollbarsRef.current?.getClientHeight() || 0;
    const scrollTop = scrollbarsRef.current?.getScrollTop() || 0;

    const isNearBottom = scrollHeight - scrollTop - clientHeight > 100;

    setIsButtonVisible(isNearBottom);
  };

  const handleClickRigthButtonMessage = (
    index: number,
    e?: React.MouseEvent
  ) => {
    if (e) {
      e.preventDefault();

      const parentDiv = e.currentTarget; // Родительский div, в котором произошел клик
      const rect = parentDiv.getBoundingClientRect(); // Получаем координаты родительского div
      const offsetX = e.clientX - rect.left; // Вычисляем позицию X относительно родительского div
      // const offsetY = e.clientY - rect.top; // Вычисляем позицию Y относительно родительского div
      const { clientY } = e;

      setModalPosition({ top: clientY, left: offsetX });
    }

    if (selectedItemIndexForOpenModal === index) {
      setSelectedItemIndexForOpenModal(null);
    } else {
      setSelectedItemIndexForOpenModal(index);
    }
  };

  const handleCloseModal = () => {
    if (selectedItemIndexForOpenModal !== null)
      setSelectedItemIndexForOpenModal(null);
  };

  const handleDeleteMessage = async () => {
    if (
      chatUID &&
      messages &&
      selectedItemIndexForOpenModal !== null &&
      currentUserUID &&
      userUID
    ) {
      await deleteDoc(
        doc(
          db,
          'chats',
          chatUID,
          'messages',
          messages[selectedItemIndexForOpenModal].id
        )
      );

      if (messages.length > 1) {
        // console.log('messages.length > 1');
        // если последнее сообщение то ставим последнее сообщение messages[selectedItemIndexForOpenModal - 1]
        if (selectedItemIndexForOpenModal === messages.length - 1) {
          const lastMessage =
            messages[selectedItemIndexForOpenModal - 1].data().message;

          const lastDateMessage =
            messages[selectedItemIndexForOpenModal - 1].data().date;

          // здесь надо переписывать последнее сообщение мне и напарнику после удаления
          await updateDoc(doc(db, 'userChats', currentUserUID), {
            [chatUID + '.lastMessage']: lastMessage,
            [chatUID + '.date']: lastDateMessage,
          });

          // =====================================================
          await updateDoc(doc(db, 'userChats', userUID), {
            [chatUID + '.lastMessage']: lastMessage,
            [chatUID + '.date']: lastDateMessage,
          });
        }
      } else {
        // console.log('messages.length < 1');
        await updateDoc(doc(db, 'userChats', currentUserUID), {
          [chatUID + '.lastMessage']: ' ',
          [chatUID + '.date']: ' ',
        });

        // =====================================================
        await updateDoc(doc(db, 'userChats', userUID), {
          [chatUID + '.lastMessage']: ' ',
          [chatUID + '.date']: ' ',
        });
      }

      setSelectedItemIndexForOpenModal(null);
    }
  };

  return (
    <div className="h-full py-1">
      <Scrollbars
        ref={scrollbarsRef}
        autoHide
        style={{
          top: 48,
          width: '100%',
          height: 'calc(100% - 48px - 80px)',
        }}
        onScroll={handleScroll}
      >
        <ul className="flex flex-col gap-2 h-full p-6">
          {messages &&
            messages.map((mes, index) => {
              // console.log(mes)
              const currentItem = selectedItemIndexForOpenModal === index;

              return (
                <li
                  key={mes.id}
                  className={`rounded-3xl ${
                    currentItem && 'bg-currentContextMenuMessage'
                  }`}
                  onClick={handleCloseModal}
                  onContextMenu={e => handleClickRigthButtonMessage(index, e)}
                >
                  <MessageItem mes={mes} />
                </li>
              );
            })}
        </ul>
      </Scrollbars>

      {isButtonVisible && (
        <button
          onClick={handleClickScrollBottom}
          className="fixed bottom-32 right-4 bg-white p-2 rounded-full"
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

      {messages && selectedItemIndexForOpenModal !== null && (
        <MessageContextMenuModal
          closeModal={handleCloseModal}
          modalPosition={modalPosition}
        >
          <div className="w-56 h-56 p-2 bg-myBlackBcg pointer-events-auto">
            <button
              className="flex items-center justify-between w-full px-8 py-2 text-white hover:cursor-pointer hover:bg-hoverGray hover:rounded-md"
              onClick={handleDeleteMessage}
            >
              <svg
                fill="#FFFFFF"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="20px"
                height="20px"
                viewBox="0 0 482.428 482.429"
                xmlSpace="preserve"
              >
                <g>
                  <g>
                    <path
                      d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098
			c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117
			h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828
			C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879
			C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096
			c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266
			c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979
			V115.744z"
                    />
                    <path
                      d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07
			c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"
                    />
                    <path
                      d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07
			c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"
                    />
                    <path
                      d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07
			c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z"
                    />
                  </g>
                </g>
              </svg>
              <span>DELETE</span>
            </button>
            {/* <p>{selectedItemIndexForOpenModal}</p> */}
          </div>
        </MessageContextMenuModal>
      )}
    </div>
  );
}

export default MessageList;
