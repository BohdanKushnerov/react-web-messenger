import { ChatListItemType } from '@myTypes';

const handleSelectChat = (
  chat: ChatListItemType,
  updateCurrentChatInfo: (chat: ChatListItemType) => void
) => {
  updateCurrentChatInfo(chat);
};

export default handleSelectChat;
