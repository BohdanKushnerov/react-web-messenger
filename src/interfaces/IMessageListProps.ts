import type { DocumentData } from 'firebase/firestore';

import type { GroupedMessages } from '../types/GroupedMessages';

export interface IMessageListProps {
  chatUID: string | null;
  groupedMessages: GroupedMessages | null;
  isReadyFirstMsgs: boolean;
  selectedDocDataMessage: DocumentData[] | null;
  isScrollDownButtonVisible: boolean;
  handleClickRigthButtonMessage: (
    message: DocumentData,
    e: React.MouseEvent
  ) => void;
  handleToggleSelectedMessage: (message: DocumentData) => void;
}
