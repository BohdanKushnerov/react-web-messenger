import { produce } from 'immer';
import { StateCreator } from 'zustand';

import { IAuthSliceState } from '@interfaces/zustand/IAuthSliceState';

const createAuthSliceState: StateCreator<IAuthSliceState> = set => ({
  isLoggedIn: null,
  currentUser: {
    uid: null,
    displayName: null,
    photoURL: null,
  },
  updateCurrentUser: user => {
    if (user === null) {
      set(() => ({
        isLoggedIn: false,
        currentUser: { uid: null, displayName: null, photoURL: null },
      }));
    } else {
      set(
        produce(state => {
          state.isLoggedIn = true;
          state.currentUser.uid = user.uid;
          state.currentUser.displayName = user.displayName;
          state.currentUser.photoURL = user.photoURL;
        })
      );
    }
  },
});

export default createAuthSliceState;
