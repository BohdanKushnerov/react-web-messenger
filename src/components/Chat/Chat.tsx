import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DocumentData,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { onValue, ref } from 'firebase/database';
import Avatar from 'react-avatar';

import MessageList from '@components/MessageList/MessageList';
import FileInput from './FileInput/FileInput';
import { database, db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import handleSendMessage from '@utils/handleSendMessage';
import { TScreen } from 'types/TScreen';

interface IChat {
  setScreen?: (value: TScreen) => void;
}

function Chat({ setScreen }: IChat) {
  const [currentChatInfo, setCurrentChatInfo] = useState<DocumentData | null>(
    null
  );
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<DocumentData[] | null>(null);
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const { chatUID, userUID } = useChatStore(state => state.currentChatInfo);
  const resetCurrentChatInfo = useChatStore(
    state => state.resetCurrentChatInfo
  );

  useEffect(() => {
    if (!userUID) return;
    const unsubUserInfoData = onSnapshot(doc(db, 'users', userUID), doc => {
      const data = doc.data();
      if (data) {
        // console.log('data', data);
        setCurrentChatInfo(data);
      }
    });

    const dbRef = ref(database, 'status/' + userUID);

    // Устанавливаем слушатель для данных
    const unsubOnlineStatus = onValue(dbRef, snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setIsOnline(data); // Здесь data будет true, если пользователь онлайн, и false, если офлайн
      } else {
        setIsOnline(false); // Если данных нет, считаем пользователя офлайн
      }
    });

    return () => {
      unsubUserInfoData();
      unsubOnlineStatus();
    };
  }, [userUID]);

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

    handleSendMessage(message, chatUID, currentUserUID, userUID);
    setMessage('');
  };

  return (
    <>
      <div className="relative h-full w-screen bg-transparent overflow-hidden ">
        {messages ? (
          <>
            <div className="fixed top-0 z-10 flex gap-4 items-center w-full h-12 px-6 border-b bg-myBlackBcg">
              {setScreen && (
                <button
                  className="flex justify-center items-center w-12 h-12 text-white hover:bg-hoverGray rounded-full cursor-pointer"
                  onClick={() => {
                    setScreen('Sidebar');
                    resetCurrentChatInfo();
                    navigate('/');
                  }}
                >
                  <svg
                    className="rotate-180"
                    fill="rgb(170,170,170)"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="25px"
                    height="25px"
                    viewBox="0 0 44.952 44.952"
                    xmlSpace="preserve"
                  >
                    <g>
                      <path
                        d="M44.952,22.108c0-1.25-0.478-2.424-1.362-3.308L30.627,5.831c-0.977-0.977-2.561-0.977-3.536,0
		c-0.978,0.977-0.976,2.568,0,3.546l10.574,10.57H2.484C1.102,19.948,0,21.081,0,22.464c0,0.003,0,0.025,0,0.028
		c0,1.382,1.102,2.523,2.484,2.523h35.182L27.094,35.579c-0.978,0.978-0.978,2.564,0,3.541c0.977,0.979,2.561,0.978,3.538-0.001
		l12.958-12.97c0.885-0.882,1.362-2.059,1.362-3.309C44.952,22.717,44.952,22.231,44.952,22.108z"
                      />
                    </g>
                  </svg>
                </button>
              )}
              {/* <img
              src={userInfo.photoURL || ''}
              alt={userInfo.photoURL || ''}
              width={40}
              height={40}
            /> */}
              {currentChatInfo?.displayName && (
                <Avatar
                  className="rounded-full"
                  name={`${currentChatInfo?.displayName}`}
                  size="35"
                />
              )}
              <p className="text-textSecondary">
                {currentChatInfo?.displayName}
              </p>
              <div
                className={`${isOnline ? 'text-green-600' : 'text-red-700'}`}
              >
                {isOnline ? 'Online' : 'Offline'}
              </div>
            </div>

            <MessageList messages={messages} />

            <form
              className="absolute bottom-0 left-0 overflow-hidden w-full z-10 flex items-center gap-4 h-20 px-6 border-t"
              onSubmit={handleManageSendMessage}
            >
              <div className="relative w-full h-10 sm:w-8/12 ">
                <input
                  autoFocus
                  className="w-full h-full py-1 px-10 rounded-3xl bg-mySeacrhBcg text-white outline-none"
                  type="text"
                  value={message}
                  onChange={handleChangeMessage}
                />
                <FileInput/>
              </div>
              <button
                className="flex justify-center items-center h-12 w-12 bg-transparent hover:bg-hoverGray rounded-full cursor-pointer"
                // onClick={handleManageSendMessage}
              >
                <svg
                  height="25px"
                  width="25px"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 25.951 25.951"
                  xmlSpace="preserve"
                >
                  <g>
                    <path
                      style={{ fill: 'rgb(170,170,170)' }}
                      d="M3,0.225h18c1.656,0,3,1.344,3,3v10c0,0.313-0.062,0.609-0.15,0.893l-2.056-1.832
		c-0.451-0.457-1.358-0.662-2.078-0.369l-3.692-3.779L23,2.7L12,8.632L1,2.7l6.977,5.438l-5.77,5.906l7.037-5.025L12,10.813
		l2.758-1.795l4.467,3.191c-0.451,0.366-0.725,0.922-0.725,1.531v1.043c-1.135,0.168-2.473,0.565-3.703,1.441H3
		c-1.656,0-3-1.344-3-3V3.225C0,1.569,1.344,0.225,3,0.225z"
                    />
                    <g>
                      <path
                        style={{ fill: 'rgb(170,170,170)' }}
                        d="M20,13.741v2.434c-3.227,0-7.5,1.564-7.5,9.551c1.412-5.096,3.314-5.488,7.5-5.488v2.473
			c0,0.191,0.105,0.363,0.281,0.437c0.059,0.024,0.121,0.036,0.182,0.036c0.123,0,0.244-0.048,0.334-0.139l5.016-4.504
			c0.184-0.184,0.184-0.484,0-0.668l-5.016-4.465c-0.135-0.135-0.34-0.176-0.516-0.103S20,13.549,20,13.741z"
                      />
                    </g>
                  </g>
                </svg>
              </button>
            </form>
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
