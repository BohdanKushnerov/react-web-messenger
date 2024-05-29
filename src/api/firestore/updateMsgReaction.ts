import { db } from '@myfirebase/config';
import updateReactions from '@utils/messages/updateReactions';
import { EmojiClickData } from 'emoji-picker-react';
import { doc, DocumentData, updateDoc } from 'firebase/firestore';

const updateMsgReaction = async (
  emojiData: EmojiClickData,
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

  const emojiKey = emojiData.emoji;
  const existingIds = reactions[emojiKey] || [];

  const newReactions = updateReactions(
    emojiKey,
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
