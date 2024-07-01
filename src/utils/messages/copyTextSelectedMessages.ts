import type { DocumentData } from 'firebase/firestore';

const copyTextSelectedMessages = (selectedDocDataMessage: DocumentData[]) => {
  if (selectedDocDataMessage?.length) {
    return selectedDocDataMessage.map(msg => msg.data().message).join(' ');
  }
};

export default copyTextSelectedMessages;
