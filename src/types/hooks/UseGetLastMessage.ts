import type { DocumentData } from 'firebase/firestore';

export type UseGetLastMessage = (
  itemChatUID: string | null
) => DocumentData | null;
