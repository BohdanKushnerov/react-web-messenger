import createAndSaveTextMsgDoc from '@api/firestore/createAndSaveTextMsgDoc';

const handleSendMessage = async (
  message: string,
  chatUID: string | null,
  currentUserUID: string | null,
  userUID: string | null
): Promise<void> => {
  if (!chatUID || !currentUserUID || !userUID) return;

  try {
    await createAndSaveTextMsgDoc(chatUID, message, currentUserUID);
  } catch (error) {
    console.log('error handleSendMessage', error);
  }
};

export default handleSendMessage;
