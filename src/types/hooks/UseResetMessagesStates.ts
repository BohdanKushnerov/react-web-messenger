import type { Dispatch, MutableRefObject, SetStateAction } from 'react';

import type { DocumentData } from 'firebase/firestore';

import type { GroupedMessages } from 'types/GroupedMessages';

export type UseResetMessagesStates = (
  isReadyToFetchFirstNewChatMessages: MutableRefObject<boolean>,
  lastLoadedMessage: MutableRefObject<DocumentData | null>,
  isFinishMessages: MutableRefObject<boolean>,
  setIsReadyFirstMessages: Dispatch<SetStateAction<boolean>>,
  setGroupedMessages: Dispatch<SetStateAction<GroupedMessages | null>>
) => void;
