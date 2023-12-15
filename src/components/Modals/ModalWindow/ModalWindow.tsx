import React, { FC } from 'react';
import { createPortal } from 'react-dom';

import useCloseModal from '@hooks/useCloseModal';
import { IModalWindowProps } from '@interfaces/IModalWindowProps';

const modalRoot = document.querySelector('#modal-root')!;

const ModalWindow: FC<IModalWindowProps> = ({
  handleToggleModal,
  children,
  contentClasses,
}) => {
  useCloseModal(handleToggleModal);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleToggleModal();
    }
  };

  return createPortal(
    <div
      onClick={handleBackdropClick}
      className={`absolute top-0 left-0 z-10 w-screen h-screen bg-transparent ${contentClasses}`}
    >
      {children}
    </div>,
    modalRoot
  );
};

export default ModalWindow;
