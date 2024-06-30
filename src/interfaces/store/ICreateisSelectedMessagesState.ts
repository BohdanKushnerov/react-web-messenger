import type { DocumentData } from 'firebase/firestore';

import type { UpdateSelectedDocDataMessage } from 'types/UpdateSelectedDocDataMessage';

export interface ICreateisSelectedMessagesState {
  isSelectedMessages: boolean;
  selectedDocDataMessage: DocumentData[] | null;
  updateIsSelectedMessages: (boolean: boolean) => void;
  updateSelectedDocDataMessage: UpdateSelectedDocDataMessage;
  resetSelectedMessages: () => void;
}
