import { DocumentData } from 'firebase/firestore';

import { IGroupedMessages } from './IGroupedMessages';

export interface IMessageListProps {
  chatUID: string | null;
  groupedMessages: IGroupedMessages | null;
  isReadyFirstMsgs: boolean;
  selectedDocDataMessage: DocumentData[] | null;
  isScrollDownButtonVisible: boolean;
  handleClickRigthButtonMessage: (
    message: DocumentData,
    e: React.MouseEvent
  ) => void;
  handleToggleSelectedMessage: (message: DocumentData) => void;
}
