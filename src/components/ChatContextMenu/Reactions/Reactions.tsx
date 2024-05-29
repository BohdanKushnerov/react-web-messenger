import { db } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { doc, DocumentData, updateDoc } from 'firebase/firestore';
import { FC } from 'react';

interface IReactions {}

const Reactions: FC<IReactions> = () => {
  // const isSelectedMessages = useChatStore(state => state.isSelectedMessages);
  const { chatUID } = useChatStore(state => state.currentChatInfo);
  const selectedDocDataMessage = useChatStore(
    state => state.selectedDocDataMessage
  );

  // console.log('selectedDocDataMessage', selectedDocDataMessage[0].id);

  const updateMsgReaction = async (
    emojiData: EmojiClickData,
    chatUID: string | null,
    selectedDocDataMessage: DocumentData[] | null
  ): Promise<void> => {
    if (chatUID && selectedDocDataMessage) {
      const msgId = selectedDocDataMessage[0].id;
      console.log(msgId, emojiData.emoji);
      const messageDocRef = doc(db, 'chats', chatUID, 'messages', msgId);
      await updateDoc(messageDocRef, {
        reaction: emojiData.emoji,
      });
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    updateMsgReaction(emojiData, chatUID, selectedDocDataMessage);
  };

  return (
    <EmojiPicker
      className="pointer-events-auto"
      reactionsDefaultOpen={true}
      allowExpandReactions={false}
      onEmojiClick={handleEmojiClick}
    />
  );
};

export default Reactions;
