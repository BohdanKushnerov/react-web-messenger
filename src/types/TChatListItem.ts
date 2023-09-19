export type TChatListItem = [
  string,
  {
    lastMessage: string;
    userInfo: {
      photoURL: string;
      displayName: string;
      uid: string;
    };
  }
];