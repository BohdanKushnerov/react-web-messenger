import { TScreen } from "types/TScreen";

export interface IChatHeaderProps {
  handleClickBackToSidebarScreen: () => void;
  setScreen?: (value: TScreen) => void;
  setIsShowSearchMessages: (value: boolean) => void;
}