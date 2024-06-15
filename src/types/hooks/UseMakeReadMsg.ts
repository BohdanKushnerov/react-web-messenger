import { DocumentData } from 'firebase/firestore';

export type UseMakeReadMsg = (msg: DocumentData, isNearBottom: boolean) => void;
