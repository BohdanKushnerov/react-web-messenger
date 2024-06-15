import { User } from 'firebase/auth';

export interface IAuthSliceState {
  isLoggedIn: boolean | null;
  currentUser: {
    uid: string | null;
    displayName: string | null;
    photoURL: string | null;
  };
  updateCurrentUser: (user: User | null) => void;
}
