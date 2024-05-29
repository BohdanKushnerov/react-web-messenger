import { FC } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

import useChatStore from '@zustand/store';
import updateMsgReaction from '@api/firestore/updateMsgReaction';

const Reactions: FC = () => {
  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const { chatUID } = useChatStore(state => state.currentChatInfo);
  const selectedDocDataMessage = useChatStore(
    state => state.selectedDocDataMessage
  );
  const resetSelectedMessages = useChatStore(
    state => state.resetSelectedMessages
  );

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    if (currentUserUID) {
      updateMsgReaction(
        emojiData,
        chatUID,
        currentUserUID,
        selectedDocDataMessage,
        resetSelectedMessages
      );
    }
  };

  return (
    <EmojiPicker
      className="pointer-events-auto"
      lazyLoadEmojis={true}
      reactionsDefaultOpen={true}
      allowExpandReactions={false}
      searchDisabled={true}
      onEmojiClick={handleEmojiClick}
    />
  );
};

export default Reactions;
