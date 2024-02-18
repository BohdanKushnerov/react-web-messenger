import { SidebarScreenValue } from '@myTypes';

export interface ISidebarScreenState {
  sidebarScreen: SidebarScreenValue;
  updateSidebarScreen: (value: SidebarScreenValue) => void;
}
