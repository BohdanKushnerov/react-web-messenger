import { useEffect, useState } from 'react';
import {
  DocumentData,
  doc,
  onSnapshot,
} from 'firebase/firestore';
import { auth, db } from '@myfirebase/config';
import useChatStore from '@zustand/store';


// interface ChatListProps {
//   setSearchUsers: (value: string) => void;
//   chatList: QuerySnapshot<DocumentData, DocumentData> | [];
//   setChatList: React.Dispatch<
//     React.SetStateAction<QuerySnapshot<DocumentData, DocumentData> | []>
//   >;
// }

type ChatListItem = [
  string,
  {
    userInfo: {
      photoURL: string;
      displayName: string;
      uid: string;
    };
  }
];

export default function ChatList() {
  const [userChatList, setUserChatList] = useState<DocumentData | []>([]);
  // const updateChatUID = useChatStore(state => state.updateChatUID)
  const updateCurrentChatInfo = useChatStore(
    state => state.updateCurrentChatInfo
  );

  // юзефект для загрузки твоих переписок 
  useEffect(() => {
    if (!auth?.currentUser?.uid) return;
    // ==========================================
    const unSub = onSnapshot(
      doc(db, 'userChats', auth?.currentUser?.uid),
      doc => {
        // const data = doc.data() as DocumentData;
        // const entries = Object.entries(data);
        // ====================================
        const data = doc.data();
        if (data) {
          const entries = Object.entries(data);
          setUserChatList(entries);
        }
      }
    );

    return () => {
      unSub();
    };
  }, []);

  const handleSelectChat = (chat: ChatListItem) => {
    updateCurrentChatInfo(chat);
  };

  return (
    <div>
      {/* тут список твоих чатов */}
      <ul className="bg-myBlackBcg">
        {userChatList &&
          userChatList.map((chat: ChatListItem) => {
            // console.log('chat', chat);
            return (
              <li
                // id={chat[0]}
                key={chat[0]}
                className="border border-inputChar"
                onClick={() => handleSelectChat(chat)}
              >
                <img
                  width={24}
                  height={24}
                  src={chat[1].userInfo.photoURL}
                  alt={chat[1].userInfo.displayName}
                />
                <p className="text-white">{chat[1].userInfo.displayName}</p>
                <p className="text-white">last message</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
