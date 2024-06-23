import { DocumentData } from 'firebase/firestore';

export interface ISelectIconsProps {
  isSelectedMessages: boolean;
  currentItem: DocumentData | undefined;
}
