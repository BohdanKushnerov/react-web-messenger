import { StateCreator } from 'zustand';
import { produce } from 'immer';
import { User } from 'firebase/auth';

interface AuthSliceState {
  isLoggedIn: boolean;
  currentUser: {
    uid: string | null;
    displayName: string | null;
  };
  updateCurrentUser: (user: User | null) => void;
}

const createAuthSliceState: StateCreator<AuthSliceState> = set => ({
  isLoggedIn: false,
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
