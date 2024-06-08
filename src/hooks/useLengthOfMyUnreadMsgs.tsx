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

const useLengthOfMyUnreadMsgs = (chatUID: string | null, isNotify = true) => {
  const [lengthOfMyUnreadMsgs, setLengthOfMyUnreadMsgs] = useState<number>(0);
  const processedMessages = useRef<string[]>([]);

  const { uid } = useChatStore(state => state.currentUser);

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
    if (!chatUID) return;
    
    const queryParams = query(
      collection(db, `chats/${chatUID}/messages`),
      orderBy('senderUserID'),
      orderBy('date', 'asc'),
      where('isRead', '==', false),
      where('senderUserID', '!=', uid)
    );
    const unsubMyUnreadMsgs = onSnapshot(queryParams, querySnapshot => {
      if (querySnapshot.docs) {
        setLengthOfMyUnreadMsgs(querySnapshot.docs.length);

        isNotify &&
          querySnapshot.docs.forEach(msg => {
            if (msg.data().isShowNotification && chatUID) {
              updateDoc(doc(db, 'chats', chatUID, 'messages', `${msg.id}`), {
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
  }, [chatUID, isNotify, uid]);

  return lengthOfMyUnreadMsgs;
};

export default useLengthOfMyUnreadMsgs;
