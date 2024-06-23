import { ReactNode } from 'react';

export interface IModalWindowProps {
  handleToggleModal: () => void;
  children: ReactNode;
  contentClasses?: string;
}
