import { DocumentData } from 'firebase/firestore';

export type UpdateSelectedDocDataMessage = (
  msg:
    | DocumentData[]
    | ((prevState: DocumentData[] | null) => DocumentData[] | null)
    | null
) => void;
