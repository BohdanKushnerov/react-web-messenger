import { useEffect, useState, useRef } from 'react';
// import { DocumentData, Firestore, doc, updateDoc } from 'firebase/firestore';
import { DocumentData } from 'firebase/firestore';
import { Scrollbars } from 'react-custom-scrollbars-2';

// import { db } from '@myfirebase/config';
// import useChatStore from '@zustand/store';
// import formatTime from '@utils/formatTime';
import MessageItem from '@components/MessageItem/MessageItem';
import MessageContextMenuModal from '@components/ModalMessageContextMenu/ModalMessageContextMenu';

interface iMessageListProps {
  messages: DocumentData[] | null;
}

function MessageList({ messages }: iMessageListProps) {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [selectedItemIndexForOpenModal, setSelectedItemIndexForOpenModal] =
    useState<number | null>(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const scrollbarsRef = useRef<Scrollbars>(null);

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

  const closeModal = () => {
    if (selectedItemIndexForOpenModal) setSelectedItemIndexForOpenModal(null);
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
              const currentItem = selectedItemIndexForOpenModal === index

              return (
                <div
                  key={mes.id}
                  className={`rounded-3xl ${
                    currentItem && 'bg-currentContextMenuMessage'
                  }`}
                  onClick={closeModal}
                  onContextMenu={e => handleClickRigthButtonMessage(index, e)}
                >
                  <MessageItem mes={mes} />
                </div>
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
          closeModal={closeModal}
          modalPosition={modalPosition}
        >
          <div className="w-56 h-56 p-2 bg-myBlackBcg">
            <p className="text-white">
              {messages[selectedItemIndexForOpenModal]
                .data()
                .date.toDate()
                .toString()}
            </p>
          </div>
        </MessageContextMenuModal>
      )}
    </div>
  );
}

export default MessageList;
