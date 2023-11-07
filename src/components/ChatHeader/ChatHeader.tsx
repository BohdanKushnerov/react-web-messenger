import { useEffect, useState } from 'react';
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';
import { onValue, ref } from 'firebase/database';

import AvatarProfile from '@components/AvatarProfile/AvatarProfile';
import { database, db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import { IChatHeader } from '@interfaces/IChatHeader';

const ChatHeader = ({
  setScreen,
  handleClickBackToSidebarScreen,
}: IChatHeader) => {
  const [currentChatInfo, setCurrentChatInfo] = useState<DocumentData | null>(
    null
  );
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [isOpponentTyping, setIsOpponentTyping] = useState(false);

  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const { chatUID, userUID } = useChatStore(state => state.currentChatInfo);

  console.log('screen --> ChatHeader');

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
          const chatData = docSnapshot.data();

          setIsOpponentTyping(chatData[userUID].isTyping);
        }
      },
      error => {
        console.error('error listner of isTyping:', error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [chatUID, currentUserUID, userUID]);

  return (
    <div className="absolute top-0 left-0 z-10 flex gap-4 items-center w-full h-14 px-6 bg-myBlackBcg shadow-bottomShadow">
      {setScreen && (
        <button
          className="flex justify-center items-center w-12 h-12 text-white hover:bg-hoverGray rounded-full cursor-pointer"
          onClick={handleClickBackToSidebarScreen}
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
      <AvatarProfile
        photoURL={currentChatInfo?.photoURL}
        displayName={currentChatInfo?.displayName}
        size="40"
      />
      <p className="text-textSecondary">{currentChatInfo?.displayName}</p>

      {isOpponentTyping ? (
        <h2 className="text-white">typing...</h2>
      ) : (
        <div className={`${isOnline ? 'text-green-600' : 'text-red-700'}`}>
          {isOnline ? 'Online' : 'Offline'}
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
