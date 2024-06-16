import { DocumentData, doc, updateDoc } from 'firebase/firestore';

import { db } from '@myfirebase/config';

import updateReactions from '@utils/messages/updateReactions';

const updateMsgReaction = async (
  emojiValue: string,
  chatUID: string | null,
  currentUserUID: string,
  selectedDocDataMessage: DocumentData[] | null,
  closeModal: () => void
): Promise<void> => {
  if (!chatUID || !selectedDocDataMessage) return;

  const reactions = selectedDocDataMessage[0].data().reactions || {};
  const msgId = selectedDocDataMessage[0].id;
  const messageDocRef = doc(db, 'chats', chatUID, 'messages', msgId);

  closeModal();

  const existingIds = reactions[emojiValue] || [];

  const newReactions = updateReactions(
    emojiValue,
    existingIds,
    currentUserUID,
    reactions
  );

  try {
    await updateDoc(messageDocRef, { reactions: newReactions });
  } catch (error) {
    console.log('updateMsgReaction error', error);
  }
};

export default updateMsgReaction;
