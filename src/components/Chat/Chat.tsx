import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DocumentData,
  Timestamp,
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { onValue, ref } from 'firebase/database';
import Avatar from 'react-avatar';

import ModalWindow from '@components/ModalWindow/ModalWindow';
import { database, db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import handleSendMessage from '../../utils/handleSendMessage';
import MessageList from '../MessageList/MessageList';
import { TScreen } from 'types/TScreen';
import uploadFileToStorage from '@utils/uploadFileToStorage';

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

  const [isModalAddFileOpen, setIsModelAddFileOpen] = useState(false);
  // const [uploadFile, setUploadFile] = useState('');
  const [fileDescription, setFileDescription] = useState('');

  const navigate = useNavigate();

  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const { chatUID, userUID } = useChatStore(state => state.currentChatInfo);
  const resetCurrentChatInfo = useChatStore(
    state => state.resetCurrentChatInfo
  );

  const hiddenFileInput = useRef<HTMLInputElement>(null);

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
      // if (!querySnapshot.empty) {
      // console.log(querySnapshot);
      setMessages(querySnapshot.docs);
      // }
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

  const handleClickFileInput = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
      console.log('click input');
    }
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('event', event);
    console.log('go');

    if (event.target.files) {
      const fileUploaded = event.target.files[0];
      const { type, name } = fileUploaded;

      console.log(`fileUploaded: ${name}`);
      console.log(`Тип файла: ${type}`);

      // const fileBlob = new Blob([fileUploaded]);
      // const imageUrl = URL.createObjectURL(fileBlob);
      // setUploadFile(imageUrl);
      handleToggleModal();
    }
  };

  const handleToggleModal = () => {
    setIsModelAddFileOpen(prev => !prev);
  };

  const handleCloseAddFileModal = () => {
    setIsModelAddFileOpen(false);
    // setUploadFile('');
    if (fileDescription) {
      setFileDescription('');
    }
    // сброс инпута на закрытие
    if (hiddenFileInput.current) {
      hiddenFileInput.current.value = '';
    }
  };

  const handleManageSendFile = async (e: React.FormEvent) => {
    e.preventDefault();

    // const filesArr: { type: string; url: string }[] = [];

    if (hiddenFileInput.current?.files) {
      const qqq = Array.from(hiddenFileInput.current.files).map(async (file) => {
        const fileBlob = new Blob([file]);
        const { name, type } = file;

        console.log(file)

        const fileUrlFromStorage = await uploadFileToStorage(
          fileBlob,
          type,
          name
        );

        return {
          type,
          name,
          url: fileUrlFromStorage,
        };
      });

      const filesArr = await Promise.all(qqq);

      // console.log("qqq", qqq);
      console.log('filesArr', filesArr);

      // надо создать сообщение с полем файл и отправить на сохранение
      await addDoc(collection(db, `chats/${chatUID}/messages`), {
        file: filesArr,
        message: fileDescription ? fileDescription : '',
        senderUserID: currentUserUID,
        date: Timestamp.now(),
        isRead: false,
      });

      if (currentUserUID && userUID) {
        await updateDoc(doc(db, 'userChats', currentUserUID), {
          [chatUID + '.lastMessage']: `${String.fromCodePoint(128206)} ${
            fileDescription ? fileDescription : `${filesArr.length} file(s)`
          }`,
          [chatUID + '.date']: serverTimestamp(),
        });
        // =====================================================
        await updateDoc(doc(db, 'userChats', userUID), {
          [chatUID + '.lastMessage']: `${String.fromCodePoint(128206)} ${
            fileDescription ? fileDescription : `${filesArr.length} file(s)`
          }`,
          [chatUID + '.date']: serverTimestamp(),
        });
      }

      handleCloseAddFileModal();
    }
  };

  const handleChangeFileDescription = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFileDescription(e.target.value);
  };

  console.dir(hiddenFileInput.current);

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
                <button
                  className="absolute top-0 right-1 flex justify-center items-center h-10 w-10 bg-transparent hover:bg-hoverGray rounded-full cursor-pointer"
                  onClick={handleClickFileInput}
                >
                  <svg
                    fill="#FFFFFF"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="25px"
                    height="25px"
                    viewBox="0 0 950 950"
                    xmlSpace="preserve"
                  >
                    <g>
                      <path
                        d="M857.7,141.3c-30.1-30.1-65.1-53.5-104.3-69.4c-37.8-15.3-77.7-23.2-118.7-23.2c-40.9,0-80.9,7.7-118.7,22.9
		c-39.1,15.8-74.2,38.9-104.3,68.8L73.1,478.3C49.3,501.9,30.9,529.4,18.3,560.2C6.2,589.9,0,621.3,0,653.6
		C0,685.7,6.1,717,18.1,746.7c12.4,30.7,30.7,58.2,54.3,81.899c23.6,23.7,51.2,42,81.9,54.5c29.7,12.101,61.1,18.2,93.3,18.2
		c32.2,0,63.6-6.1,93.3-18.1c30.8-12.5,58.399-30.8,82.1-54.4l269.101-268c17.3-17.2,30.6-37.3,39.699-59.7
		c8.801-21.6,13.2-44.5,13.2-67.899c0-48.2-18.8-93.2-52.899-127c-34-34.2-79.2-53.1-127.301-53.3c-48.199-0.1-93.5,18.6-127.6,52.7
		L269.6,473.3c-8.5,8.5-13.1,19.7-13.1,31.601c0,11.899,4.6,23.199,13.1,31.6l0.7,0.7c17.4,17.5,45.8,17.5,63.3,0.1l168-167.5
		c35.1-34.8,92.1-35,127.199-0.399c16.9,16.8,26.101,39.3,26.101,63.399c0,24.3-9.4,47.101-26.5,64.101l-269,268
		c-0.5,0.5-0.9,0.899-1.2,1.5c-29.7,28.899-68.9,44.699-110.5,44.5c-41.9-0.2-81.2-16.5-110.6-46c-14.7-15-26.1-32.5-34-52
		C95.5,694,91.7,674,91.7,653.6c0-41.8,16.1-80.899,45.4-110.3c0.4-0.3,0.7-0.6,1.1-0.899l337.9-337.8c0.3-0.3,0.6-0.7,0.899-1.1
		c21.4-21,46.3-37.4,74-48.5c27-10.8,55.4-16.2,84.601-16.2c29.199,0,57.699,5.6,84.6,16.4c27.9,11.3,52.9,27.8,74.3,49.1
		c21.4,21.4,37.9,46.4,49.2,74.3c10.9,26.9,16.4,55.4,16.4,84.6c0,29.3-5.5,57.9-16.5,85c-11.301,28-28,53.2-49.5,74.8l-233.5,232.8
		c-8.5,8.5-13.2,19.7-13.2,31.7s4.7,23.2,13.1,31.6l0.5,0.5c17.4,17.4,45.8,17.4,63.2,0L857.5,586.9
		C887.601,556.8,911,521.7,926.9,482.6C942.3,444.8,950,404.9,950,363.9c0-40.9-7.8-80.8-23.1-118.5
		C911.101,206.3,887.8,171.3,857.7,141.3z"
                      />
                    </g>
                  </svg>
                  <input
                    type="file"
                    multiple
                    onChange={handleChange}
                    ref={hiddenFileInput}
                    style={{ display: 'none' }}
                  />
                </button>
              </div>
              <button
                className="flex justify-center items-center h-12 w-12 bg-transparent hover:bg-hoverGray rounded-full cursor-pointer"
                type="submit"
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
      {isModalAddFileOpen && (
        <ModalWindow handleToggleModal={handleToggleModal}>
          <div className="h-full flex justify-center items-center ">
            <div className="flex flex-col gap-8 bg-myBlackBcg">
              <div className="flex gap-8">
                <button
                  className="hover:bg-hoverGray cursor-pointer"
                  onClick={handleCloseAddFileModal}
                >
                  <svg
                    fill="#000000"
                    height="25px"
                    width="25px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 512 512"
                    xmlSpace="preserve"
                  >
                    <g>
                      <g>
                        <polygon
                          points="512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512 
			512,452.922 315.076,256 		"
                        />
                      </g>
                    </g>
                  </svg>
                </button>
                <p className="text-white">Send File</p>
              </div>
              {hiddenFileInput.current?.files &&
                Array.from(hiddenFileInput.current.files).map(file => {
                  console.log('file', file);
                  if (
                    file.type === 'image/jpeg' ||
                    file.type === 'image/png' ||
                    file.type === 'image/gif' ||
                    file.type === 'image/webp'
                  ) {
                    return (
                      <div key={file.name}>
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Image ${file.name}`}
                          width={100}
                          height={100}
                        />
                      </div>
                    );
                  } else {
                    return (
                      <p>
                        <span className="bg-gray-100">{file.type}</span>
                        {file.name}
                      </p>
                    );
                  }
                })}
              <form
                className="w-full flex items-center gap-4 h-20 px-6 border-t"
                onSubmit={handleManageSendFile}
              >
                <div className="relative w-full h-10 sm:w-8/12 ">
                  <input
                    className="w-full h-full py-1 px-10 rounded-3xl bg-mySeacrhBcg text-white"
                    type="text"
                    value={fileDescription}
                    onChange={handleChangeFileDescription}
                  />
                </div>
                <button
                  className="flex justify-center items-center h-12 w-12 bg-transparent text-white hover:bg-hoverGray rounded-full cursor-pointer"
                  type="submit"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </ModalWindow>
      )}
    </>
  );
}

export default Chat;
