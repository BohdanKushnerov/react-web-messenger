import React, { useEffect, useState } from 'react';
import {
  DocumentData,
  doc,
  onSnapshot,
} from 'firebase/firestore';

import ChatListItem from '@components/ChatListItem/ChatListItem';
import { auth, db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import { TChatListItem } from 'types/TChatListItem';
import { TScreen } from 'types/TScreen';

interface IChatList {
  setScreen?: (value: TScreen) => void;
}

const ChatList = React.memo(({ setScreen }: IChatList) => {
  // console.log('ChatList');
  const [userChatList, setUserChatList] = useState<DocumentData | []>([]);

  const { chatUID } = useChatStore(state => state.currentChatInfo);

  // юзефект для загрузки твоих переписок
  useEffect(() => {
    if (!auth?.currentUser?.uid) return;
    // ==========================================
    const unSub = onSnapshot(
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
      unSub();
    };
  }, [chatUID]);

  return (
    <div>
      {/* тут список твоих чатов */}
      <ul className="bg-myBlackBcg">
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
