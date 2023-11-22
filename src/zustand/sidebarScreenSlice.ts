import { StateCreator } from 'zustand';
import { produce } from 'immer';

import { ISidebarScreenState } from '@interfaces/zustand/ISidebarScreen';
import { SidebarScreenValue } from 'types/SidebarScreenValue';

const createSidebarScreenState: StateCreator<ISidebarScreenState> = set => ({
  sidebarScreen: 'default',
  updateSidebarScreen: (value: SidebarScreenValue) => {
    set(
      produce(state => {
        state.sidebarScreen = value;
      })
    );
  },
});

export default createSidebarScreenState;
