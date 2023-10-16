import { StateCreator } from "zustand";
import { produce } from "immer";

import { ISidebarScreen } from "@interfaces/zustand/ISidebarScreen";
import { TValueSidebarScreen } from "types/TValueSidebarScreen";

const createSidebarScreenState: StateCreator<ISidebarScreen> = set => ({
  sidebarScreen: 'default',
  setSidebarScreen: (value: TValueSidebarScreen) => {
    set(
      produce(state => {
        state.sidebarScreen = value;
      })
    );
  },
});

export default createSidebarScreenState;
