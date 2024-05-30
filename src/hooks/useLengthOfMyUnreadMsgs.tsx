import { useEffect, useRef, useState } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

import { db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import { ChatListItemType } from 'types/ChatListItemType';

const useLengthOfMyUnreadMsgs = (
  chatInfo: ChatListItemType,
  isNotify = true
) => {
  const [lengthOfMyUnreadMsgs, setLengthOfMyUnreadMsgs] = useState<number>(0);
  const processedMessages = useRef<string[]>([]);

  const { uid } = useChatStore(state => state.currentUser);
  const chatID = chatInfo[0];

  useEffect(() => {
    if (lengthOfMyUnreadMsgs === 0) {
      processedMessages.current = [];
    }

    return () => {
      if (processedMessages.current.length > 0) {
        processedMessages.current = [];
      }
    };
  }, [lengthOfMyUnreadMsgs]);

  useEffect(() => {
    const queryParams = query(
      collection(db, `chats/${chatID}/messages`),
      orderBy('senderUserID'), // Add orderBy for senderUserID
      orderBy('date', 'asc'),
      where('isRead', '==', false),
      where('senderUserID', '!=', uid)
    );
    // ваш код здесь
    const unsubMyUnreadMsgs = onSnapshot(queryParams, querySnapshot => {
      if (querySnapshot.docs) {
        setLengthOfMyUnreadMsgs(querySnapshot.docs.length);

        isNotify &&
          querySnapshot.docs.forEach(msg => {
            if (msg.data().isShowNotification && chatID) {
              updateDoc(doc(db, 'chats', chatID, 'messages', `${msg.id}`), {
                ['isShowNotification']: false,
              }).then(() => {
                if (processedMessages.current.includes(msg.id)) {
                  return;
                }

                processedMessages.current.push(msg.id);

                new Notification('new Message', {
                  body: msg.data().message,
                });

                const audio = document.getElementById(
                  'notify'
                ) as HTMLAudioElement;

                // Воспроизводим звук
                if (audio) {
                  audio.play();
                }

                return;
              });
            }
          });
      }
    });
    return () => {
      unsubMyUnreadMsgs();
    };
  }, [chatID, isNotify, uid]);

  return lengthOfMyUnreadMsgs;
};

export default useLengthOfMyUnreadMsgs;
