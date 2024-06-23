import { ISelectedChatInfo } from '@interfaces/ISelectedChatInfo';

const handleSelectChat = (
  selectedChatInfo: ISelectedChatInfo,
  updateCurrentChatInfo: (selectedChatInfo: ISelectedChatInfo) => void
) => {
  updateCurrentChatInfo(selectedChatInfo);
};

export default handleSelectChat;
