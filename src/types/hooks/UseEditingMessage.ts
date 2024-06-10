import { DocumentData } from 'firebase/firestore';

export type UseEditingMessage = (
  editingMessageInfo: {
    selectedMessage: DocumentData;
  } | null,
  setMessage: (msg: string | ((prev: string) => string)) => void
) => void;
