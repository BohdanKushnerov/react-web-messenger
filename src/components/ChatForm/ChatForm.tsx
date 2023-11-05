import React, { useEffect, useRef, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';

import FileInput from '@components/Inputs/FileInput/FileInput';
import Emoji from '@components/Emoji/Emoji';
import { db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import handleUpdateEditMessage from '@utils/handleUpdateEditMessage';
import handleSendMessage from '@utils/handleSendMessage';
import sprite from '@assets/sprite.svg';

const ChatForm = () => {
  const [message, setMessage] = useState('');
  const [myTyping, setMyTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>();

  const inputRef = useRef<HTMLInputElement>(null);

  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const { chatUID, userUID } = useChatStore(state => state.currentChatInfo);
  const editingMessageInfo = useChatStore(state => state.editingMessageInfo);
  const resetEditingMessage = useChatStore(state => state.resetEditingMessage);

  console.log('screen --> ChatForm');

  useEffect(() => {
    inputRef.current?.focus();
  }, [message]);

  const handleCancelEditingMessage = () => {
    resetEditingMessage();
  };

  useEffect(() => {
    if (editingMessageInfo) {
      const mes = editingMessageInfo.selectedMessage.data().message;
      setMessage(mes);
    } else {
      setMessage('');
    }
  }, [editingMessageInfo]);

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
        clearTimeout(typingTimeout);
      }
    };
  }, [chatUID, currentUserUID, myTyping, typingTimeout]);

  return (
    <div className="absolute bottom-0 left-0 z-10 w-full h-24 flex flex-col items-center">
      <div className="relative flex flex-col justify-center w-full h-full shadow-whiteTopShadow xl:w-8/12">
        {editingMessageInfo && (
          <div className="relative flex items-center gap-3 ml-3 mr-16 px-10 rounded-3xl bg-mySeacrhBcg">
            <svg width={20} height={20}>
              <use href={sprite + '#icon-pencil'} fill="#FFFFFF" />
            </svg>
            <div>
              <p className="flex text-violet-500">Edit message</p>
              <p className="text-white">
                {editingMessageInfo.selectedMessage.data().message ||
                  'empty message... =)'}
              </p>
            </div>
            <button onClick={handleCancelEditingMessage}>
              <svg className="absolute top-3.5 right-4" width={20} height={20}>
                <use href={sprite + '#icon-cross-close'} fill="#FFFFFF" />
              </svg>
            </button>
          </div>
        )}
        <form
          className="flex justify-center items-center gap-2 px-3"
          onSubmit={handleManageSendMessage}
        >
          <input
            autoFocus
            className="w-full h-10 py-1 pl-10 pr-14 rounded-3xl bg-mySeacrhBcg text-white border-2 border-transparent outline-none focus:border-solid focus:border-cyan-500"
            type="text"
            placeholder="Write your message..."
            ref={inputRef}
            value={message}
            onChange={handleChangeMessage}
          />
          <button className="flex justify-center items-center h-12 w-12 bg-transparent hover:bg-hoverGray rounded-full cursor-pointer">
            <svg width={24} height={24}>
              <use
                href={sprite + '#icon-send-message'}
                fill="rgb(170,170,170)"
              />
            </svg>
          </button>
        </form>
        <FileInput />
        <Emoji setMessage={setMessage} />
      </div>
    </div>
  );
};

export default ChatForm;
