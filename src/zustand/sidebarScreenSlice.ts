import { StateCreator } from "zustand";
import { produce } from "immer";

import { ISidebarScreenState } from '@interfaces/zustand/ISidebarScreen';
import { TValueSidebarScreen } from "types/TValueSidebarScreen";

const createSidebarScreenState: StateCreator<ISidebarScreenState> = set => ({
  sidebarScreen: 'default',
  updateSidebarScreen: (value: TValueSidebarScreen) => {
    set(
      produce(state => {
        state.sidebarScreen = value;
      })
    );
  },
});

export default createSidebarScreenState;
