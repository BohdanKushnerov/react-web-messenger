import { SidebarScreenValue } from 'types/SidebarScreenValue';

export interface ISidebarScreenState {
  sidebarScreen: SidebarScreenValue;
  updateSidebarScreen: (value: SidebarScreenValue) => void;
}
