import {
  type Dispatch,
  type MutableRefObject,
  type SetStateAction,
  useEffect,
} from 'react';

import type { DocumentData } from 'firebase/firestore';

import useChatStore from '@store/store';

import type { GroupedMessages } from 'types/GroupedMessages';

type UseResetMessagesStates = (
  isReadyToFetchFirstNewChatMessages: MutableRefObject<boolean>,
  lastLoadedMessage: MutableRefObject<DocumentData | null>,
  isFinishMessages: MutableRefObject<boolean>,
  setIsReadyFirstMessages: Dispatch<SetStateAction<boolean>>,
  setGroupedMessages: Dispatch<SetStateAction<GroupedMessages | null>>
) => void;

const useResetMessagesStates: UseResetMessagesStates = (
  isReadyToFetchFirstNewChatMessages,
  lastLoadedMessage,
  isFinishMessages,
  setIsReadyFirstMessages,
  setGroupedMessages
) => {
  const { chatUID } = useChatStore(state => state.currentChatInfo);

  useEffect(() => {
    if (!chatUID) return;

    isReadyToFetchFirstNewChatMessages.current = true;
    lastLoadedMessage.current = null;
    isFinishMessages.current = false;

    setGroupedMessages(null);
    setIsReadyFirstMessages(false);
  }, [
    chatUID,
    isFinishMessages,
    isReadyToFetchFirstNewChatMessages,
    lastLoadedMessage,
    setGroupedMessages,
    setIsReadyFirstMessages,
  ]);
};

export default useResetMessagesStates;
