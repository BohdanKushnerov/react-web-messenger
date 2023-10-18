import { TScreen } from "types/TScreen";

export interface IChatHeader {
  handleClickBackToSidebarScreen: () => void;
  setScreen?: (value: TScreen) => void;
}