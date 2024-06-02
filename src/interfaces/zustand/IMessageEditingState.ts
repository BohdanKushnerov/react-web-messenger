import { DocumentData } from "firebase/firestore";

export interface IMessageEditingState {
  editingMessageInfo: {
    selectedMessage: DocumentData;
    // isLastMessage: boolean;
  } | null;
  updateEditingMessage: (message: {
    selectedMessage: DocumentData;
    // isLastMessage: boolean;
  }) => void;
  resetEditingMessage: () => void;
}
