import type { Dispatch, SetStateAction } from 'react';

import type { DocumentData } from 'firebase/firestore';

import mergeChatMessages from './mergeChatMessages';

import type { GroupedMessages } from 'types/GroupedMessages';

const sortAndMergeScrollNewGroupedMessages = (
  groupedMessages: DocumentData,
  setGroupedMessages: Dispatch<SetStateAction<GroupedMessages | null>>
) => {
  const entries = Object.entries(groupedMessages);
  entries.forEach(arr => arr[1].reverse());
  entries.sort(
    ([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime()
  );
  const sortedData = Object.fromEntries(entries);

  setGroupedMessages(prev =>
    mergeChatMessages(sortedData, prev as GroupedMessages)
  );
};

export default sortAndMergeScrollNewGroupedMessages;
