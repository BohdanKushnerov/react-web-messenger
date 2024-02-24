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

  useEffect(() => {
    if (lengthOfMyUnreadMsgs === 0) {
      console.log(1111111111111111111111111);
      processedMessages.current = [];
    } else {
      console.log('processedMessages.current', processedMessages.current);
    }

    return () => {
      if (processedMessages.current.length > 0) {
        console.log(22222222222222222222222222222);

        processedMessages.current = [];
      }
    };
  }, [lengthOfMyUnreadMsgs]);

  useEffect(() => {
    const queryParams = query(
      collection(db, `chats/${chatInfo[0]}/messages`),
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
            if (msg.data().isShowNotification && chatInfo[0]) {
              updateDoc(
                doc(db, 'chats', chatInfo[0], 'messages', `${msg.id}`),
                {
                  ['isShowNotification']: false,
                }
              ).then(() => {
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
                // setProcessedMessages(prev => [...prev, msg.id]);
              });
            }
          });
      }
    });
    return () => {
      unsubMyUnreadMsgs();
    };
  }, [chatInfo, isNotify, uid]);

  // useEffect(() => {
  //   const queryParams = query(
  //     collection(db, `chats/${chatInfo[0]}/messages`),
  //     where('isRead', '==', false),
  //     where('senderUserID', '!=', uid)
  //   );
  //   const unsubMyUnreadMsgs = onSnapshot(queryParams, querySnapshot => {
  //     if (querySnapshot.docs && querySnapshot.docs.length) {
  //       setLengthOfMyUnreadMsgs(querySnapshot.docs.length);

  //       isNotify &&
  //         querySnapshot.docs.forEach(msg => {
  //           console.log('msg.data', msg.data());
  //           console.log(
  //             'msg.data.isShowNotification',
  //             msg.data().isShowNotification
  //           );
  //           console.log('msg.data.message', msg.data().message);

  //           if (msg.data().isShowNotification && chatInfo[0]) {
  //             new Notification('new Message', {
  //               body: msg.data().message,
  //             });

  //             updateDoc(
  //               doc(db, 'chats', chatInfo[0], 'messages', `${msg.id}`),
  //               {
  //                 ['isShowNotification']: false,
  //               }
  //             );

  //             const audio = document.getElementById(
  //               'notify'
  //             ) as HTMLAudioElement;

  //             // Воспроизводим звук
  //             if (audio) {
  //               audio.play();
  //             }
  //           }
  //         });
  //     }
  //   });
  //   return () => {
  //     unsubMyUnreadMsgs();
  //   };
  // }, [chatInfo, isNotify, uid]);

  return lengthOfMyUnreadMsgs;
};

export default useLengthOfMyUnreadMsgs;
