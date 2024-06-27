import type { Dispatch, SetStateAction } from 'react';

import type { GroupedMessages } from 'types/GroupedMessages';

export type UseChatMessageUpdates = (
  setGroupedMessages: Dispatch<SetStateAction<GroupedMessages | null>>
) => void;
