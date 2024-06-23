import { FC } from 'react';

import useChatStore from '@zustand/store';

import updateMsgReaction from '@api/firestore/updateMsgReaction';

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
      updateMsgReaction(
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
          <button
            className="cursor-pointer transition-all duration-100 ease-in-out hover:scale-125"
            type="button"
            onClick={() => handleEmojiClick(emoji.emoji)}
            aria-label={emoji.emoji}
          >
            <img className="object-cover" src={emoji.src} alt={emoji.alt} />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Reactions;
