import { DocumentData } from "firebase/firestore";

export interface iMessageListProps {
  messages: DocumentData[] | null;
}