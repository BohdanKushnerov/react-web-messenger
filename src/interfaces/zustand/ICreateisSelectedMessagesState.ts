import { DocumentData } from 'firebase/firestore';

export interface ICreateisSelectedMessagesState {
  isSelectedMessages: boolean;
  selectedDocDataMessage: DocumentData[] | null;
  updateIsSelectedMessages: (boolean: boolean) => void;
  updateSelectedDocDataMessage: (
    msg:
      | DocumentData[]
      | null
      | ((prevState: DocumentData[] | null) => DocumentData[] | null)
  ) => void;
}
