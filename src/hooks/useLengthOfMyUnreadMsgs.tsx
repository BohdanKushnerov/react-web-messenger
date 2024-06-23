import { useEffect, useRef, useState } from 'react';

import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';

import { db } from '@myfirebase/config';

import useChatStore from '@zustand/store';

import updateDocStopNotifyForCurrentMsg from '@api/firestore/updateDocStopNotifyForCurrentMsg';

import { UseLengthOfMyUnreadMsgs } from 'types/hooks/UseLengthOfMyUnreadMsgs';

const useLengthOfMyUnreadMsgs: UseLengthOfMyUnreadMsgs = (
  chatUID,
  isNotify = true,
  isGetAdditionalMessage = true
) => {
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
          isGetAdditionalMessage &&
          querySnapshot.docs.forEach(msg =>
            updateDocStopNotifyForCurrentMsg(msg, chatUID)
          );
      }
    });

    return () => {
      unsubMyUnreadMsgs();
    };
  }, [chatUID, isGetAdditionalMessage, isNotify, uid]);

  return lengthOfMyUnreadMsgs;
};

export default useLengthOfMyUnreadMsgs;
