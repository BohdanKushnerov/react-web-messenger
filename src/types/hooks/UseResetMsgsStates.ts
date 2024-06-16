import { Dispatch, MutableRefObject, SetStateAction } from 'react';

import { DocumentData } from 'firebase/firestore';

import { IGroupedMessages } from '@interfaces/IGroupedMessages';

export type UseResetMsgsStates = (
  chatUID: string | null,
  isReadyToFetchFirstNewChatMsgs: MutableRefObject<boolean>,
  lastLoadedMsg: MutableRefObject<DocumentData | null>,
  isFinishMsgs: MutableRefObject<boolean>,
  setIsReadyFirstMsgs: Dispatch<SetStateAction<boolean>>,
  setGroupedMessages: Dispatch<SetStateAction<IGroupedMessages | null>>
) => void;
