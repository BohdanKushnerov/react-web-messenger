import { DocumentData } from 'firebase/firestore';

import { UpdateSelectedDocDataMessage } from 'types/UpdateSelectedDocDataMessage';

export interface ICreateisSelectedMessagesState {
  isSelectedMessages: boolean;
  selectedDocDataMessage: DocumentData[] | null;
  updateIsSelectedMessages: (boolean: boolean) => void;
  updateSelectedDocDataMessage: UpdateSelectedDocDataMessage;
  resetSelectedMessages: () => void;
}
