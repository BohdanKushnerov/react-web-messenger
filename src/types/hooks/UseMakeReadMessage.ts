import type { DocumentData } from 'firebase/firestore';

export type UseMakeReadMessage = (
  msg: DocumentData,
  isNearBottom: boolean
) => void;
