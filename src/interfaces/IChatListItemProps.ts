import { ChatListItemType } from 'types/ChatListItemType';
import { AppScreenType } from 'types/AppScreenType';

export interface IChatListItemProps {
  chatInfo: ChatListItemType;
  setScreen?: (value: AppScreenType) => void;
}
