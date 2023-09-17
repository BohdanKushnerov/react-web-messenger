import { useEffect, useState } from 'react';
import {
  DocumentData,
  // Firestore,
  collection,
  // doc,
  onSnapshot,
  orderBy,
  query,
  // updateDoc,
} from 'firebase/firestore';
// import { Scrollbars } from 'react-custom-scrollbars-2';

import { db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
// import formatTime from './utils/formatTime';
import handleSendMessage from './utils/handleSendMessage';
import MessageList from '../MessageList/MessageList';

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<DocumentData[] | null>(null);
  // const [isButtonVisible, setIsButtonVisible] = useState(false);

  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const { chatUID, userInfo } = useChatStore(state => state.currentChatInfo);

  // const scrollbarsRef = useRef<Scrollbars>(null);

  useEffect(() => {
    if (chatUID === null) return;

    const q = query(
      collection(db, `chats/${chatUID}/messages`),
      orderBy('date', 'asc')
      // orderBy('date', 'desc')
    );

    onSnapshot(q, snapshot => {
      // if (!snapshot.empty) {
      //   if(!messages) {
      //     console.log('1111111111111111111111111111111111111111111111')
      //     setMessages(snapshot.docs);
      //   }
      // }
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          console.log('New mes: ', change.doc.data());
          // if(messages) {
          //   setMessages([change.doc]);
          // } else {
          //   setMessages(prev => [...prev, change.doc]);
          // }
        }
        if (change.type === 'modified') {
          console.log('Modified mes: ', change.doc.data());
        }
        if (change.type === 'removed') {
          console.log('Removed mes: ', change.doc.data());
        }
      });
    });

    const unSub = onSnapshot(q, querySnapshot => {
      if (!querySnapshot.empty) {
        setMessages(querySnapshot.docs);
      }
    });

    return () => {
      unSub();
    };
  }, [chatUID, currentUserUID]);

  // useEffect(() => {
  //   handleClickScrollBottom();
  // }, [messages]);

  // const handleClickScrollBottom = () => {
  //   if (scrollbarsRef.current) {
  //     scrollbarsRef.current.scrollToBottom();
  //   }
  // };

  // надо тротл добавить чтобі не так часто срабатывало
  // const handleScroll = () => {
  //   const scrollHeight = scrollbarsRef.current?.getScrollHeight() || 0;
  //   const clientHeight = scrollbarsRef.current?.getClientHeight() || 0;
  //   const scrollTop = scrollbarsRef.current?.getScrollTop() || 0;

  //   const isNearBottom = scrollHeight - scrollTop - clientHeight > 100;

  //   setIsButtonVisible(isNearBottom);
  // };

  // const makeReadMes = async (
  //   db: Firestore,
  //   chatUID: string,
  //   mesUID: string
  // ) => {
  //   if (chatUID === null) {
  //     // Обработка случая, когда chatUID равен null
  //     return;
  //   }

  //   updateDoc(doc(db, 'chats', chatUID, 'messages', `${mesUID}`), {
  //     ['isRead']: true,
  //   });
  // };

  const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="bg-transparent w-screen">
      {messages && (
        <>
          <div className="flex gap-4 items-center h-12 px-7 border-b bg-myBlackBcg">
            <img
              src={userInfo.photoURL || ''}
              alt={userInfo.photoURL || ''}
              width={40}
              height={40}
            />{' '}
            <p className="text-textSecondary">{userInfo.displayName}</p>
          </div>

          <div className="mx-4">
            <MessageList messages={messages} />
            <form
              className="flex items-end gap-4 my-auto p-6 border-t"
              onSubmit={e =>
                handleSendMessage(
                  e,
                  message,
                  setMessage,
                  chatUID,
                  currentUserUID,
                  userInfo.uid
                )
              }
            >
              <input
                className="py-1 px-10 h-12 w-8/12 rounded-3xl bg-mySeacrhBcg text-white"
                type="text"
                value={message}
                onChange={handleChangeMessage}
              />
              <button
                className="h-12 w-12 bg-white border rounded-full"
                type="submit"
              >
                Send
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default Chat;
