import { TValueSidebarScreen } from "types/TValueSidebarScreen";

export interface ISidebarScreen {
  sidebarScreen: TValueSidebarScreen;
  setSidebarScreen: (value: TValueSidebarScreen) => void;
}