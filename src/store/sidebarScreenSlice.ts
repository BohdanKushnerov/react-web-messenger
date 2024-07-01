import { produce } from 'immer';
import type { StateCreator } from 'zustand';

import type { ISidebarScreenState } from '@interfaces/store/ISidebarScreen';

import type { SidebarScreenValue } from 'types/SidebarScreenValue';

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
