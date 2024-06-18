import { Dispatch, SetStateAction, useEffect } from 'react';

import {
  DocumentChange,
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp,
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';

import { db } from '@myfirebase/config';

import useChatStore from '@zustand/store';

import mergeChatMessages from '@utils/messages/mergeChatMessages';

import { IGroupedMessages } from '@interfaces/IGroupedMessages';

import { UseChatMessageUpdates } from 'types/hooks/UseChatMessageUpdates';

const extractDateString = (timestamp: Timestamp): string => {
  const date = timestamp.toDate();
  return date.toISOString().split('T')[0];
};

const updateGroupedMessages = (
  prev: IGroupedMessages,
  dateString: string,
  doc: QueryDocumentSnapshot<DocumentData, DocumentData>,
  updateType: 'add' | 'modify' | 'remove'
) => {
  const updatedMessages = { ...prev };

  if (updateType === 'add') {
    if (updatedMessages[dateString]) {
      updatedMessages[dateString].push(doc);
    } else {
      updatedMessages[dateString] = [doc];
    }
  } else if (updateType === 'modify') {
    const index = updatedMessages[dateString].findIndex(
      item => item.id === doc.id
    );

    if (index !== -1) {
      updatedMessages[dateString] = [
        ...updatedMessages[dateString].slice(0, index),
        doc,
        ...updatedMessages[dateString].slice(index + 1),
      ];
    }
  } else if (updateType === 'remove') {
    updatedMessages[dateString] = updatedMessages[dateString].filter(
      item => item.id !== doc.id
    );

    if (updatedMessages[dateString].length === 0) {
      delete updatedMessages[dateString];
    }
  }

  return updatedMessages;
};

const handleAddedMessage = (
  change: DocumentChange<DocumentData, DocumentData>,
  setGroupedMessages: Dispatch<SetStateAction<IGroupedMessages | null>>
) => {
  const messageData = change.doc.data();
  if (messageData?.date) {
    const dateString = extractDateString(messageData.date);
    const docID = change.doc.id;

    const obj = { [dateString]: [change.doc] };

    setGroupedMessages(prev => {
      if (prev && Object.values(prev)[0].some(msg => msg.id === docID)) {
        return prev;
      } else {
        return mergeChatMessages(prev as IGroupedMessages, obj);
      }
    });
  }
};

const handleAddedFirstMessage = (
  change: DocumentChange<DocumentData, DocumentData>,
  setGroupedMessages: Dispatch<SetStateAction<IGroupedMessages | null>>
) => {
  const messageData = change.doc.data();
  if (messageData?.date) {
    const dateString = extractDateString(messageData.date);
    const docID = change.doc.id;

    const obj = { [dateString]: [change.doc] };

    setGroupedMessages(prev => {
      if (prev && Object.keys(prev).length !== 0) {
        const prevElId = Object.values(prev)[0][0]?.id;

        if (docID === prevElId) {
          return prev;
        }
      }
      return mergeChatMessages(prev as IGroupedMessages, obj);
    });
  }
};

const handleModifiedMessage = (
  change: DocumentChange<DocumentData, DocumentData>,
  setGroupedMessages: Dispatch<SetStateAction<IGroupedMessages | null>>
) => {
  const messageData = change.doc.data();
  if (messageData?.date) {
    const dateString = extractDateString(messageData.date);

    const doc = change.doc;

    setGroupedMessages(prev => {
      if (prev) {
        return updateGroupedMessages(prev, dateString, doc, 'modify');
      }
      return prev;
    });
  }
};

const handleRemovedMessage = (
  change: DocumentChange<DocumentData, DocumentData>,
  setGroupedMessages: Dispatch<SetStateAction<IGroupedMessages | null>>
) => {
  const messageData = change.doc.data();
  if (messageData?.date) {
    const dateString = extractDateString(messageData.date);

    setGroupedMessages(prev => {
      if (prev) {
        return updateGroupedMessages(prev, dateString, change.doc, 'remove');
      }
      return prev;
    });
  }
};

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
          const isFirstmessage =
            snapshot.size === 1 && snapshot.docChanges().length === 1;

          const isNewMessage =
            snapshot.size !== 1 && snapshot.docChanges().length === 1;

          if (isNewMessage) {
            handleAddedMessage(change, setGroupedMessages);
          } else if (isFirstmessage) {
            handleAddedFirstMessage(change, setGroupedMessages);
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
