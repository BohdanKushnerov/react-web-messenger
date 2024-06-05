import { DocumentData } from 'firebase/firestore';

export interface IUserChatNameProps {
  currentChatUID: string | null;
  itemChatUID: string | null;
  userInfo: DocumentData | null;
}
