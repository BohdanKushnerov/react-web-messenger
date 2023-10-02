import { TChatListItem } from "types/TChatListItem";
// import { TScreen } from "types/TScreen";

const handleSelectChat = (
  chat: TChatListItem,
  updateCurrentChatInfo: (chat: TChatListItem) => void,
  // setScreen?: (value: TScreen) => void
) => {
  updateCurrentChatInfo(chat);
  // if (setScreen) {
  //   setScreen('Chat');
  // }
};

export default handleSelectChat;
