import { Dispatch, SetStateAction } from 'react';

import { DocumentData } from 'firebase/firestore';

import mergeChatMessages from './mergeChatMessages';

import { IGroupedMessages } from '@interfaces/IGroupedMessages';

const sortAndMergeScrollNewGroupedMessages = (
  groupedMsgs: DocumentData,
  setGroupedMessages: Dispatch<SetStateAction<IGroupedMessages | null>>
) => {
  const entries = Object.entries(groupedMsgs);
  entries.forEach(arr => arr[1].reverse());
  entries.sort(
    ([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime()
  );
  const sortedData = Object.fromEntries(entries);

  setGroupedMessages(prev =>
    mergeChatMessages(sortedData, prev as IGroupedMessages)
  );
};

export default sortAndMergeScrollNewGroupedMessages;
