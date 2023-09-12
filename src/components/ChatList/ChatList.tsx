import { useEffect, useState } from 'react';
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import { TChatListItem } from 'types/TChatListItem';

export default function ChatList() {
  const [userChatList, setUserChatList] = useState<DocumentData | []>([]);
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

  const handleSelectChat = (chat: TChatListItem) => {
    updateCurrentChatInfo(chat);
  };

  return (
    <div>
      {/* тут список твоих чатов */}
      <ul className="bg-myBlackBcg">
        {userChatList &&
          userChatList.map((chat: TChatListItem) => {
            // console.log("chat", chat)
            return (
              <li
                key={chat[0]}
                className="flex border border-inputChar"
                onClick={() => handleSelectChat(chat)}
              >
                <img
                  width={50}
                  height={50}
                  src={chat[1].userInfo.photoURL}
                  alt={chat[1].userInfo.displayName}
                />
                <div>
                  <p className="font-bold text-white">
                    {chat[1].userInfo.displayName}
                  </p>
                  <p className="text-textSecondary">
                    {chat[1].lastMessage}
                  </p>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
