import React, { useEffect, useState } from 'react';
import {
  DocumentData,
  doc,
  onSnapshot,
} from 'firebase/firestore';

import ChatListItem from '@components/ChatListItem/ChatListItem';
import { auth, db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import { IChatListProps } from '@interfaces/IChatListProps';
import { TChatListItem } from 'types/TChatListItem';

const ChatList = React.memo(({ setScreen }: IChatListProps) => {
  const [userChatList, setUserChatList] = useState<DocumentData | []>([]);
  
  const { chatUID } = useChatStore(state => state.currentChatInfo);
  
  // console.log('ChatList');
  
  // юзефект для загрузки твоих переписок
  useEffect(() => {
    if (!auth?.currentUser?.uid) return;
    // ==========================================
    const unsubMyUserChats = onSnapshot(
      doc(db, 'userChats', auth?.currentUser?.uid),
      doc => {
        const data = doc.data();
        if (data) {
          // после uodate last message из-за асинхронщины сначала date: null приходит, а потом аж date: _Timestamp поэтому чтобы не пригал список 2 раза делаем проверку на null
          if (chatUID && !data?.[chatUID].date) {
            return;
          }

          const entries = Object.entries(data).sort(
            (a, b) => b[1].date - a[1].date
          );

          setUserChatList(entries);
        }
      }
    );

    return () => {
      unsubMyUserChats();
    };
  }, [chatUID]);

  return (
    <div>
      <ul className="p-0 m-0">
        {userChatList &&
          userChatList.map((chatInfo: TChatListItem) => (
            <ChatListItem
              key={chatInfo[0]}
              chatInfo={chatInfo}
              setScreen={setScreen}
            />
          ))}
      </ul>
    </div>
  );
});

export default ChatList;
