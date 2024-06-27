import type { DocumentData } from 'firebase/firestore';

const groupNewMsgs = (updatedMessages: DocumentData[]) => {
  return updatedMessages.reduce((acc, message) => {
    const messageData = message.data();
    if (messageData?.date) {
      const date = messageData.date.toDate();
      const dateString = date.toISOString().split('T')[0];

      acc[dateString] = acc[dateString] || [];
      acc[dateString].push(message);
    }

    return acc;
  }, {});
};

export default groupNewMsgs;
