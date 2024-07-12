import { type Dispatch, type SetStateAction, useEffect } from 'react';

import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

import { db } from '@myfirebase/config';

import useChatStore from '@store/store';

import handleAddedMessage from '@utils/messages/handleAddedMessage';
import handleModifiedMessage from '@utils/messages/handleModifiedMessage';
import handleRemovedMessage from '@utils/messages/handleRemovedMessage';

import type { GroupedMessages } from 'types/GroupedMessages';

type UseChatMessageUpdates = (
  setGroupedMessages: Dispatch<SetStateAction<GroupedMessages | null>>
) => void;

const useChatMessageUpdates: UseChatMessageUpdates = setGroupedMessages => {
  const { chatUID } = useChatStore(state => state.currentChatInfo);

  useEffect(() => {
    if (chatUID === null) return;

    const queryParams = query(
      collection(db, `chats/${chatUID}/messages`),
      orderBy('date', 'desc')
    );

    const unsubChatMessages = onSnapshot(queryParams, snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          const isNewMessage =
            snapshot.size !== 1 && snapshot.docChanges().length === 1;

          if (isNewMessage) {
            handleAddedMessage(change, setGroupedMessages);
          }
        } else if (change.type === 'modified') {
          handleModifiedMessage(change, setGroupedMessages);
        } else if (change.type === 'removed') {
          handleRemovedMessage(change, setGroupedMessages);
        }
      });
    });

    return () => {
      unsubChatMessages();
    };
  }, [chatUID, setGroupedMessages]);
};

export default useChatMessageUpdates;
