export type TChatListItem = [
  string,
  {
    userInfo: {
      photoURL: string;
      displayName: string;
      uid: string;
    };
  }
];