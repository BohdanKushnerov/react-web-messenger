import createAndSaveTextMessageDoc from '@api/firestore/createAndSaveTextMessageDoc';

const handleSendMessage = async (
  displayName: string | null,
  message: string,
  tokenFCM: string | null,
  chatUID: string | null,
  currentUserUID: string | null,
  userUID: string | null
): Promise<void> => {
  if (!chatUID || !currentUserUID || !userUID) return;

  try {
    await createAndSaveTextMessageDoc(chatUID, message, currentUserUID);

    if (!tokenFCM) return;

    const { VITE_NOTIFY_PATH } = import.meta.env;

    const data = {
      token: tokenFCM,
      title: displayName,
      body: message,
    };

    fetch(VITE_NOTIFY_PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).catch(error => console.error('Error:', error));
  } catch (error) {
    console.error('handleSendMessage', error);
  }
};

export default handleSendMessage;
