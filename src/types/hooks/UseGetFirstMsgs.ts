import { Dispatch, MutableRefObject, SetStateAction } from 'react';

import { DocumentData } from 'firebase/firestore';

import { IGroupedMessages } from '@interfaces/IGroupedMessages';

export type UseGetFirstMsgs = (
  isReadyToFetchFirstNewChatMsgs: MutableRefObject<boolean>,
  lastLoadedMsg: MutableRefObject<DocumentData | null>,
  setIsReadyFirstMsgs: Dispatch<SetStateAction<boolean>>,
  setGroupedMessages: Dispatch<SetStateAction<IGroupedMessages | null>>
) => void;
