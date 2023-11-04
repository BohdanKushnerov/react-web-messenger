// import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import {
//   DocumentData,
//   collection,
//   onSnapshot,
//   orderBy,
//   query,
// } from 'firebase/firestore';

import MessageList from '@components/MessageList/MessageList';
import ChatForm from '../ChatForm/ChatForm';
import ChatHeader from '../ChatHeader/ChatHeader';
// import { db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import { IChat } from '@interfaces/IChat';

function Chat({ setScreen }: IChat) {
  // const [messages, setMessages] = useState<DocumentData[] | null>(null);
  const navigate = useNavigate();

  // const currentUserUID = useChatStore(state => state.currentUser.uid);
  const { chatUID } = useChatStore(state => state.currentChatInfo);
  const resetCurrentChatInfo = useChatStore(
    state => state.resetCurrentChatInfo
  );

  console.log('screen --> Chat');

  // useEffect(() => {
  //   if (chatUID === null) return;

  //   localStorage.setItem('currentChatId', chatUID);

  //   const q = query(
  //     collection(db, `chats/${chatUID}/messages`),
  //     orderBy('date', 'asc')
  //   );

  //   onSnapshot(q, snapshot => {
  //     // if (!snapshot.empty) {
  //     //   if(!messages) {
  //     //     console.log('1111111111111111111111111111111111111111111111')
  //     //     setMessages(snapshot.docs);
  //     //   }
  //     // }
  //     snapshot.docChanges().forEach(change => {
  //       if (change.type === 'added') {
  //         // console.log('New mes: ', change.doc.data());
  //         // if(messages) {
  //         //   setMessages([change.doc]);
  //         // } else {
  //         //   setMessages(prev => [...prev, change.doc]);
  //         // }
  //         // console.log('change', change.doc.data());

  //         if (
  //           change.doc.data().senderUserID !== currentUserUID &&
  //           change.doc.data().isRead === false
  //         ) {
  //           // new Notification('new Message', {
  //           //   body: change.doc.data().message,
  //           // });
  //         }
  //       }
  //       if (change.type === 'modified') {
  //         // console.log('Modified mes: ', change.doc.data());
  //       }
  //       if (change.type === 'removed') {
  //         // console.log('Removed mes: ', change.doc.data());
  //       }
  //     });
  //   });

  //   const unSub = onSnapshot(q, querySnapshot => {
  //     setMessages(querySnapshot.docs);
  //   });

  //   return () => {
  //     unSub();
  //     localStorage.removeItem('currentChatId');
  //   };
  // }, [chatUID, currentUserUID]);

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
        {chatUID ? (
          <>
            <ChatHeader
              setScreen={setScreen}
              handleClickBackToSidebarScreen={handleClickBackToSidebarScreen}
            />

            <MessageList 
            // messages={messages} 
            />

            <ChatForm />
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
