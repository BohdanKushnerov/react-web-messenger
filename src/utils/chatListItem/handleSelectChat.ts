import { ChatListItemType } from "types/ChatListItemType";

const handleSelectChat = (
  chat: ChatListItemType,
  updateCurrentChatInfo: (chat: ChatListItemType) => void
) => {
  updateCurrentChatInfo(chat);
};

export default handleSelectChat;
