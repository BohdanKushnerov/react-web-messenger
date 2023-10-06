import { useEffect, useState, useRef } from 'react';
// import { DocumentData, Firestore, doc, updateDoc } from 'firebase/firestore';
import { DocumentData } from 'firebase/firestore';
import { Scrollbars } from 'react-custom-scrollbars-2';

// import { db } from '@myfirebase/config';
// import useChatStore from '@zustand/store';
// import formatTime from '@utils/formatTime';
import MessageItem from '@components/MessageItem/MessageItem';

interface iMessageListProps {
  messages: DocumentData[] | null;
}

function MessageList({ messages }: iMessageListProps) {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
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
            messages.map(mes => {
              // console.log(mes)

              return <MessageItem key={mes.id} mes={mes} />;
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
    </div>
  );
}

export default MessageList;
