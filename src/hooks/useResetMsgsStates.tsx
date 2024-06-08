import { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react';
import { DocumentData } from 'firebase/firestore';

import { IGroupedMessages } from '@interfaces/IGroupedMessages';

const useResetMsgsStates = (
  chatUID: string | null,
  isReadyToFetchFirstNewChatMsgs: MutableRefObject<boolean>,
  lastLoadedMsg: MutableRefObject<DocumentData | null>,
  isFinishMsgs: MutableRefObject<boolean>,
  setIsReadyFirstMsgs: Dispatch<SetStateAction<boolean>>,
  setGroupedMessages: Dispatch<SetStateAction<IGroupedMessages | null>>
) => {
  useEffect(() => {
    isReadyToFetchFirstNewChatMsgs.current = true;
    lastLoadedMsg.current = null;
    isFinishMsgs.current = false;

    setGroupedMessages(null);
    setIsReadyFirstMsgs(false);
  }, [
    chatUID,
    isFinishMsgs,
    isReadyToFetchFirstNewChatMsgs,
    lastLoadedMsg,
    setGroupedMessages,
    setIsReadyFirstMsgs,
  ]);
};

export default useResetMsgsStates;
