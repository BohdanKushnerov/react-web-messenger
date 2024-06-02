import { DocumentData } from "firebase/firestore";

export interface IUseEditingMessage {
  (
    editingMessageInfo: {
      selectedMessage: DocumentData;
      // isLastMessage: boolean;
    } | null,
    setMessage: (msg: string | ((prev: string) => string)) => void
  ): void;
}