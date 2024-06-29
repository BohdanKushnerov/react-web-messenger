import type { Dispatch, MutableRefObject, SetStateAction } from 'react';

import type { DocumentData } from 'firebase/firestore';

import type { GroupedMessages } from 'types/GroupedMessages';

export type UseGetFirstMessages = (
  isReadyToFetchFirstNewChatMessages: MutableRefObject<boolean>,
  lastLoadedMessage: MutableRefObject<DocumentData | null>,
  setIsReadyFirstMessages: Dispatch<SetStateAction<boolean>>,
  setGroupedMessages: Dispatch<SetStateAction<GroupedMessages | null>>
) => void;
