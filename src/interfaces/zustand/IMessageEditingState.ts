import { DocumentData } from 'firebase/firestore';

export interface IMessageEditingState {
  editingMessageInfo: {
    selectedMessage: DocumentData;
  } | null;
  updateEditingMessage: (message: { selectedMessage: DocumentData }) => void;
  resetEditingMessage: () => void;
}
