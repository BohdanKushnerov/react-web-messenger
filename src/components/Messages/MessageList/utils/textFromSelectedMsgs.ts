import { DocumentData } from 'firebase/firestore';

export const textFromSelectedMsgs = (
  selectedDocDataMessage: DocumentData[]
) => {
  if (selectedDocDataMessage?.length) {
    return selectedDocDataMessage.map(msg => msg.data().message).join(' ');
  }
};
