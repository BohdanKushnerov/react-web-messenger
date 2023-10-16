import React from 'react';
import { createPortal } from 'react-dom';

import useCloseModal from '@hooks/useCloseModal';

interface IModalWindow {
  handleToggleModal: ()=>void;
  children: React.ReactNode;
}

const modalRoot = document.querySelector('#modal-root')!;

const ModalWindow = ({ handleToggleModal, children }: IModalWindow) => {
  useCloseModal(handleToggleModal);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(e);
    if (e.target === e.currentTarget) {
      handleToggleModal();
    }
  };

  return createPortal(
    <div
      onClick={handleBackdropClick}
      className="absolute top-0 left-0 z-10 w-screen h-screen bg-transparent"
    >
      {children}
    </div>,
    modalRoot
  );
}

export default ModalWindow;
