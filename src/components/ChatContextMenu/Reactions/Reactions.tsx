import type { FC } from 'react';

import Button from '@components/common/Button/Button';

import useChatStore from '@store/store';

import updateMessageReaction from '@api/firestore/updateMessageReaction';

import defaultEmojiData from '@constants/defaultEmojiData';

const Reactions: FC = () => {
  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const { chatUID } = useChatStore(state => state.currentChatInfo);
  const selectedDocDataMessage = useChatStore(
    state => state.selectedDocDataMessage
  );
  const resetSelectedMessages = useChatStore(
    state => state.resetSelectedMessages
  );

  const handleEmojiClick = (emoji: string) => {
    if (currentUserUID) {
      updateMessageReaction(
        emoji,
        chatUID,
        currentUserUID,
        selectedDocDataMessage,
        resetSelectedMessages
      );
    }
  };

  return (
    <ul className="pointer-events-auto flex h-12 w-260px items-center justify-center gap-1 rounded-full border border-white bg-[#ffffff90] p-2 backdrop-blur-lg">
      {defaultEmojiData.map(emoji => (
        <li key={emoji.id} className="h-full w-full">
          <Button
            variant="reactions"
            type="button"
            onClick={() => handleEmojiClick(emoji.emoji)}
            ariaLabel={emoji.emoji}
          >
            <img className="object-cover" src={emoji.src} alt={emoji.alt} />
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default Reactions;
