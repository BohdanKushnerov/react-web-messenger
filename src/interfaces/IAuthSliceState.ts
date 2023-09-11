import { User } from "firebase/auth";

export interface IAuthSliceState {
  isLoggedIn: boolean;
  currentUser: {
    uid: string | null;
    displayName: string | null;
  };
  updateCurrentUser: (user: User | null) => void;
}
