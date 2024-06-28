import type { ReactNode } from 'react';

export interface IModalWindowProps {
  handleToggleModal: () => void;
  children: ReactNode;
}
