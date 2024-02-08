import { DocumentData } from 'firebase/firestore';

export interface IMessageItemProps {
  msg: DocumentData;
  isNearBottom: boolean;
}
