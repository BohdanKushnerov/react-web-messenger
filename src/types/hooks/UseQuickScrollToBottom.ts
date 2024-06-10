import { RefObject } from 'react';

import { IGroupedMessages } from '@interfaces/IGroupedMessages';

export type UseQuickScrollToBottom = (
  bottomElementRef: RefObject<HTMLDivElement>,
  isReadyFirstMsgs: boolean,
  isScrollDownButtonVisible: boolean,
  groupedMessages: IGroupedMessages | null
) => void;
