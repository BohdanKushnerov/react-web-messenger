import type { DocumentData } from 'firebase/firestore';

export interface IEditingMsgInfoProps {
  selectedMessage: DocumentData;
  handleCancelEditingMessage: () => void;
}
