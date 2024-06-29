import type { DocumentData } from 'firebase/firestore';

export interface IEditingMessageInfoProps {
  selectedMessage: DocumentData;
  handleCancelEditingMessage: () => void;
}
