import { DocumentData } from 'firebase/firestore';

function copyTextSelectedMsgs(selectedDocDataMessage: DocumentData[]) {
  if (selectedDocDataMessage?.length) {
    return selectedDocDataMessage.map(msg => msg.data().message).join(' ');
  }
}

export default copyTextSelectedMsgs
