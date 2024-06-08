import { DocumentData } from "firebase/firestore";

export interface IUseEditingMessage {
  (
    editingMessageInfo: {
      selectedMessage: DocumentData;
    } | null,
    setMessage: (msg: string | ((prev: string) => string)) => void
  ): void;
}