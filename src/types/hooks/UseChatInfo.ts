import { DocumentData } from 'firebase/firestore';

export type UseChatInfo = (userUID: string | null) => DocumentData | null;
