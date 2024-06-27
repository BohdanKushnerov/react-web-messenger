import type { DocumentData } from 'firebase/firestore';

export type GroupedMessages = {
  [date: string]: DocumentData[];
};
