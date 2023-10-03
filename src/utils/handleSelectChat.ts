import { TChatListItem } from "types/TChatListItem";
// import { TScreen } from "types/TScreen";

const handleSelectChat = (
  chat: TChatListItem,
  updateCurrentChatInfo: (chat: TChatListItem) => void,
) => {
  updateCurrentChatInfo(chat);
};

export default handleSelectChat;
