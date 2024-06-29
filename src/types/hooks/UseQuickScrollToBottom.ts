import type { RefObject } from 'react';

import type { GroupedMessages } from 'types/GroupedMessages';

export type UseQuickScrollToBottom = (
  bottomElementRef: RefObject<HTMLDivElement>,
  isReadyFirstMessages: boolean,
  isScrollDownButtonVisible: boolean,
  groupedMessages: GroupedMessages | null
) => void;
