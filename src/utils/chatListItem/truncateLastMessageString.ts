import { DocumentData } from 'firebase/firestore';

const truncateLastMessageString = (msg: DocumentData, maxLength: number) => {
  const messageContent = msg.fileDescription
    ? `${msg.fileDescription} ${msg.message}`
    : msg.message;

  if (messageContent.length <= maxLength) {
    return messageContent;
  } else {
    return messageContent.substring(0, maxLength) + '...';
  }
};

export default truncateLastMessageString;
