import React from 'react';
import { createPortal } from 'react-dom';

import useCloseModal from '@hooks/useCloseModal';
import { IModalWindowProps } from '@interfaces/IModalWindowProps';

const modalRoot = document.querySelector('#modal-root')!;

const ModalWindow = ({
  handleToggleModal,
  children,
  contentClasses,
}: IModalWindowProps) => {
  useCloseModal(handleToggleModal);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // console.log(e);
    if (e.target === e.currentTarget) {
      handleToggleModal();
    }
  };

  return createPortal(
    <div
      onClick={handleBackdropClick}
      className="absolute top-0 left-0 z-10 w-screen h-screen bg-transparent"
    >
      <div className={`${contentClasses}`}>{children}</div>
    </div>,
    modalRoot
  );
};

export default ModalWindow;
