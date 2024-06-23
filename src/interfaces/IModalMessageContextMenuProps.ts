import { ReactNode } from 'react';

export interface IModalMessageContextMenuProps {
  closeModal: () => void;
  modalPosition: {
    top: number;
    left: number;
  };
  children: ReactNode;
}
