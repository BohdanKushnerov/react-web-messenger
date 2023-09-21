import { TScreen } from "@pages/Home/Home";
import { TChatListItem } from "types/TChatListItem";

const handleSelectChat = (
  chat: TChatListItem,
  updateCurrentChatInfo: (chat: TChatListItem) => void,
  setScreen?: (value: TScreen) => void
) => {
  updateCurrentChatInfo(chat);
  if (setScreen) {
    setScreen('Chat');
  }
};

export default handleSelectChat;
