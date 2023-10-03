import { StateCreator } from 'zustand';
import { produce } from 'immer';

import { IAuthSliceState } from '@interfaces/zustand/IAuthSliceState';

const createAuthSliceState: StateCreator<IAuthSliceState> = set => ({
  // isLoggedIn: false,
  isLoggedIn: null,
  currentUser: {
    uid: null,
    displayName: null,
  },
  updateCurrentUser: user => {
    if (user === null) {
      set(() => ({
        isLoggedIn: false,
        currentUser: { uid: null, displayName: null },
      }));
    } else {
      set(
        produce(state => {
          state.isLoggedIn = true;
          state.currentUser.uid = user.uid;
          state.currentUser.displayName = user.displayName;
        })
      );
    }
  },
});

export default createAuthSliceState;
