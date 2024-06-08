import { DocumentData } from 'firebase/firestore';

export interface IEditingMsgInfoProps {
  selectedMessage: DocumentData;
  handleCancelEditingMessage: () => void;
}
