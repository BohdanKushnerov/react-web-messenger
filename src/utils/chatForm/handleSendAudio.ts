import createAndSaveVoiceMsgDoc from '@api/firestore/createAndSaveVoiceMsgDoc';
import uploadAudioToStorage from '@api/storage/uploadAudioToStorage';

import makeCursorOnProgress from '@utils/makeCursorOnProgress';
import resetCursorOnDefault from '@utils/resetCursorOnDefault';

const handleSendAudio = async (
  audioBlob: Blob,
  chatUID: string,
  userUID: string,
  currentUserUID: string
): Promise<void> => {
  try {
    makeCursorOnProgress();
    const downloadURL = await uploadAudioToStorage(audioBlob, userUID);

    const fileData = [
      {
        type: 'audio/mpeg',
        name: 'voice audio',
        url: downloadURL,
      },
    ];

    await createAndSaveVoiceMsgDoc(chatUID, fileData, currentUserUID);
    resetCursorOnDefault();
  } catch (error) {
    console.error('Error sending audio message:', error);
  }
};

export default handleSendAudio;
