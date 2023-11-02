import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DocumentData,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';

import MessageList from '@components/MessageList/MessageList';
import ChatForm from '../ChatForm/ChatForm';
import ChatHeader from '../ChatHeader/ChatHeader';
import { db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import handleSendMessage from '@utils/handleSendMessage';
import handleUpdateEditMessage from '@utils/handleUpdateEditMessage';
import { IChat } from '@interfaces/IChat';

function Chat({ setScreen }: IChat) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<DocumentData[] | null>(null);
  const [myTyping, setMyTyping] = useState(false);
  const [isOpponentTyping, setIsOpponentTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>();
  const navigate = useNavigate();

  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const { chatUID, userUID } = useChatStore(state => state.currentChatInfo);
  const resetCurrentChatInfo = useChatStore(
    state => state.resetCurrentChatInfo
  );

  const { editingMessageInfo, resetEditingMessage } = useChatStore(
    state => state
  );

  console.log('screen --> Chat');

  // когда печатаю запускаю таймаут
  useEffect(() => {
    if (chatUID && currentUserUID && message) {
      const updateTypingIsTrue = async () => {
        setMyTyping(true);
        const chatDocRef = doc(db, 'chats', chatUID);

        const updateTypingTrue = {
          [currentUserUID]: {
            isTyping: true,
          },
        };

        await updateDoc(chatDocRef, updateTypingTrue);
      };

      const updateTypingIsFalse = async () => {
        setMyTyping(false);

        const chatDocRef = doc(db, 'chats', chatUID);

        const updateTypingTrue = {
          [currentUserUID]: {
            isTyping: false,
          },
        };

        await updateDoc(chatDocRef, updateTypingTrue);
      };

      updateTypingIsTrue();

      const newTypingTimeout = setTimeout(() => {
        updateTypingIsFalse();
      }, 3000);

      setTypingTimeout(newTypingTimeout);
    }
  }, [chatUID, currentUserUID, message, userUID]);

  // Устанавливаем обработчик сброса таймаута чтобы закрыть старый и открыть новый
  useEffect(() => {
    return () => {
      if (typingTimeout && myTyping) {
        console.log('111');
        clearTimeout(typingTimeout);
      }
    };
  }, [chatUID, currentUserUID, myTyping, typingTimeout]);

  // тут слушатель на изменения печатает/не печатает
  useEffect(() => {
    if (!chatUID || !userUID) {
      return;
    }

    const chatDocRef = doc(db, 'chats', chatUID);

    const unsubscribe = onSnapshot(
      chatDocRef,
      docSnapshot => {
        if (docSnapshot.exists()) {
          // console.log(docSnapshot);
          const chatData = docSnapshot.data();

          // console.log('c', chatData[currentUserUID].isTyping);
          // console.log('u', chatData[userUID].isTyping);
          setIsOpponentTyping(chatData[userUID].isTyping);
        }
      },
      error => {
        console.error('Ошибка при установлении слушателя:', error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [chatUID, currentUserUID, userUID]);

  useEffect(() => {
    if (editingMessageInfo) {
      const mes = editingMessageInfo.selectedMessage.data().message;
      setMessage(mes);
    } else {
      setMessage('');
    }
  }, [editingMessageInfo]);

  useEffect(() => {
    if (chatUID === null) return;

    localStorage.setItem('currentChatId', chatUID);

    const q = query(
      collection(db, `chats/${chatUID}/messages`),
      orderBy('date', 'asc')
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

    const unSub = onSnapshot(q, querySnapshot => {
      setMessages(querySnapshot.docs);
    });

    return () => {
      unSub();
      localStorage.removeItem('currentChatId');
    };
  }, [chatUID, currentUserUID]);

  const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleManageSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (message.trim() === '') {
      return;
    }

    if (editingMessageInfo) {
      handleUpdateEditMessage(
        editingMessageInfo,
        chatUID,
        message,
        currentUserUID,
        userUID
      );
      resetEditingMessage();
    } else {
      handleSendMessage(message, chatUID, currentUserUID, userUID);
      setMessage('');
    }
  };

  const handleClickBackToSidebarScreen = () => {
    if (setScreen) {
      setScreen('Sidebar');
      resetCurrentChatInfo();
      navigate('/');
    }
  };

  return (
    <>
      <div className="relative h-full w-screen xl:flex xl:flex-col xl:items-center bg-transparent overflow-hidden ">
        {messages ? (
          <>
            <ChatHeader
              setScreen={setScreen}
              handleClickBackToSidebarScreen={handleClickBackToSidebarScreen}
              isOpponentTyping={isOpponentTyping}
            />

            <MessageList messages={messages} />

            <ChatForm
              message={message}
              setMessage={setMessage}
              handleChangeMessage={handleChangeMessage}
              handleManageSendMessage={handleManageSendMessage}
            />
          </>
        ) : (
          <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-gray-700 rounded-xl text-center text-white font-black">
            Select or search user who you would to start messaging
          </h2>
        )}
      </div>
    </>
  );
}

export default Chat;
