import { TValueSidebarScreen } from "types/TValueSidebarScreen";

export interface ISidebarScreenState {
  sidebarScreen: TValueSidebarScreen;
  updateSidebarScreen: (value: TValueSidebarScreen) => void;
}