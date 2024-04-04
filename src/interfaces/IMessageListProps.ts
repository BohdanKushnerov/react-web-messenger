import { RefObject } from 'react';
import { DocumentData } from 'firebase/firestore';

import { IGroupedMessages } from './IGroupedMessages';

export interface IMessageListProps {
  msgListRef: RefObject<HTMLDivElement>;
  bottomElementRef: RefObject<HTMLDivElement>;
  groupedMessages: IGroupedMessages | null;
  isLoadedContent: boolean;
  isSelectedMessages: boolean;
  selectedDocDataMessage: DocumentData[] | null;
  isScrollDownButtonVisible: boolean;
  handleClickRigthButtonMessage: (
    message: DocumentData,
    e?: React.MouseEvent
  ) => void;
  handleToggleSelectedMessage: (message: DocumentData) => void;
}
