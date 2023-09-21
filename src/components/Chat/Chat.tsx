import { useEffect, useState } from 'react';
import {
  DocumentData,
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import Avatar from 'react-avatar';

import { db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import handleSendMessage from './utils/handleSendMessage';
import MessageList from '../MessageList/MessageList';
import { TScreen } from '@pages/Home/Home';

interface IChat {
  setScreen?: (value: TScreen) => void;
}

function Chat({ setScreen }: IChat) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<DocumentData[] | null>(null);

  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const { chatUID, userInfo } = useChatStore(state => state.currentChatInfo);

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
      // if (!querySnapshot.empty) {
        // console.log(querySnapshot);
        setMessages(querySnapshot.docs);
      // }
    });

    return () => {
      unSub();
    };
  }, [chatUID, currentUserUID]);

  const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="relative overflow-hidden h-full bg-transparent w-screen">
      {messages && (
        <>
          <div className="fixed top-0 z-10 flex gap-4 items-center w-full h-12 px-6 border-b bg-myBlackBcg">
            {setScreen && (
              <button
                className="text-white"
                onClick={() => setScreen('Sidebar')}
              >
                назад
              </button>
            )}
            {/* <img
              src={userInfo.photoURL || ''}
              alt={userInfo.photoURL || ''}
              width={40}
              height={40}
            /> */}
            <Avatar
              className="rounded-full"
              name={`${userInfo.displayName}`}
              size="35"
            />
            <p className="text-textSecondary">{userInfo.displayName}</p>
          </div>

          <MessageList messages={messages} />

          <form
            className="absolute bottom-0 left-0 overflow-hidden w-full z-10 flex items-center gap-4 h-20 px-6 border-t"
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
              className="h-10 w-full sm:w-8/12 py-1 px-10 rounded-3xl bg-mySeacrhBcg text-white"
              type="text"
              value={message}
              onChange={handleChangeMessage}
            />
            <button
              className="h-10 w-12 bg-white border rounded-full"
              type="submit"
            >
              Send
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Chat;
