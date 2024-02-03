import { useEffect, useState } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

import { db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import { ChatListItemType } from 'types/ChatListItemType';
// import audio from '@assets/notify.mp3'

const useLengthOfMyUnreadMsgs = (chatInfo: ChatListItemType) => {
  const [lengthOfMyUnreadMsgs, setLengthOfMyUnreadMsgs] = useState<number>(0);

  const { uid } = useChatStore(state => state.currentUser);

  useEffect(() => {
    const queryParams = query(
      collection(db, `chats/${chatInfo[0]}/messages`),
      where('isRead', '==', false),
      where('senderUserID', '!=', uid)
    );
    const unsubMyUnreadMsgs = onSnapshot(queryParams, querySnapshot => {
      if (querySnapshot.docs) {
        setLengthOfMyUnreadMsgs(querySnapshot.docs.length);

        querySnapshot.docs.forEach(msg => {
          // console.log("msg.data", msg.data());

          if (msg.data().isShowNotification) {
            // console.log(
            //   'msg.data().isShowNotification',
            //   msg.data().isShowNotification
            // );

            new Notification('new Message', {
              body: msg.data().message,
            });

            // Создаем аудиоэлемент
            // const audioElement = new Audio(audio);

            // const url = URL.createObjectURL(audio);
            // const audio = new Audio(url);

            const audio = document.getElementById('notify') as HTMLAudioElement;

            // Воспроизводим звук
            if (audio) {
              audio.play();
            }

            updateDoc(doc(db, 'chats', chatInfo[0], 'messages', `${msg.id}`), {
              ['isShowNotification']: false,
            });
          }

          // console.log("msg.data().id", msg);
        });
      }
    });
    return () => {
      unsubMyUnreadMsgs();
    };
  }, [chatInfo, uid]);

  return lengthOfMyUnreadMsgs;
};

export default useLengthOfMyUnreadMsgs;
