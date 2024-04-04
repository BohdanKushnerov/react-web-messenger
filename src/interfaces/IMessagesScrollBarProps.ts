import { RefObject } from "react";

export interface IMessagesScrollBarProps {
  scrollbarsRef: RefObject<HTMLDivElement>;
  handleScroll: () => void;
  children: React.ReactNode;
}