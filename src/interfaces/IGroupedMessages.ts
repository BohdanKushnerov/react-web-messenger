import { DocumentData } from 'firebase/firestore';

export interface IGroupedMessages {
  [date: string]: DocumentData[];
}
