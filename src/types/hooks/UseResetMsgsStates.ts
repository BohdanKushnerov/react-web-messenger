import type { Dispatch, MutableRefObject, SetStateAction } from 'react';

import type { DocumentData } from 'firebase/firestore';

import type { GroupedMessages } from 'types/GroupedMessages';

export type UseResetMsgsStates = (
  isReadyToFetchFirstNewChatMsgs: MutableRefObject<boolean>,
  lastLoadedMsg: MutableRefObject<DocumentData | null>,
  isFinishMsgs: MutableRefObject<boolean>,
  setIsReadyFirstMsgs: Dispatch<SetStateAction<boolean>>,
  setGroupedMessages: Dispatch<SetStateAction<GroupedMessages | null>>
) => void;
