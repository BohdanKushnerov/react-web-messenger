import { DocumentData } from 'firebase/firestore';
import { UpdateSelectedDocDataMessage } from 'types/UpdateSelectedDocDataMessage';

export type UseSelectedMessagesHandling = (
  chatUID: string | null,
  isSelectedMessages: boolean,
  selectedDocDataMessage: DocumentData[] | null,
  updateIsSelectedMessages: (boolean: boolean) => void,
  updateSelectedDocDataMessage: UpdateSelectedDocDataMessage,
  resetSelectedMessages: () => void
) => void;
