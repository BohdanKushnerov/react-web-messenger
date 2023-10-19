import { TChatListItem } from "types/TChatListItem";
import { TScreen } from "types/TScreen";

export interface IChatListItemProps {
  chatInfo: TChatListItem;
  setScreen?: (value: TScreen) => void;
}