import { useEffect, useRef, useState } from 'react';

import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';

import { db } from '@myfirebase/config';

import useChatStore from '@store/store';

import updateDocStopNotifyForCurrentMessage from '@api/firestore/updateDocStopNotifyForCurrentMessage';

type UseLengthOfMyUnreadMessages = (
  chatUID: string | null,
  isNotify?: boolean,
  isGetAdditionalMessage?: boolean
) => number;

const useLengthOfMyUnreadMessages: UseLengthOfMyUnreadMessages = (
  chatUID,
  isNotify = true,
  isGetAdditionalMessage = true
) => {
  const [lengthOfMyUnreadMessages, setLengthOfMyUnreadMessages] =
    useState<number>(0);

  const processedMessages = useRef<string[]>([]);

  const { uid } = useChatStore(state => state.currentUser);

  useEffect(() => {
    if (lengthOfMyUnreadMessages === 0) {
      processedMessages.current = [];
    }

    return () => {
      if (processedMessages.current.length > 0) {
        processedMessages.current = [];
      }
    };
  }, [lengthOfMyUnreadMessages]);

  useEffect(() => {
    if (!chatUID) return;

    const queryParams = query(
      collection(db, `chats/${chatUID}/messages`),
      orderBy('senderUserID'),
      orderBy('date', 'asc'),
      where('isRead', '==', false),
      where('senderUserID', '!=', uid)
    );

    const unsubMyUnreadMessages = onSnapshot(queryParams, querySnapshot => {
      if (querySnapshot.docs) {
        setLengthOfMyUnreadMessages(querySnapshot.docs.length);

        isNotify &&
          isGetAdditionalMessage &&
          querySnapshot.docs.forEach(msg =>
            updateDocStopNotifyForCurrentMessage(msg, chatUID)
          );
      }
    });

    return () => {
      unsubMyUnreadMessages();
    };
  }, [chatUID, isGetAdditionalMessage, isNotify, uid]);

  return lengthOfMyUnreadMessages;
};

export default useLengthOfMyUnreadMessages;
