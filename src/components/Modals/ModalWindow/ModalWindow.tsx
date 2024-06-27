import type { FC } from 'react';
import { createPortal } from 'react-dom';

import useCloseModal from '@hooks/useCloseModal';

import type { IModalWindowProps } from '@interfaces/IModalWindowProps';

const modalRoot = document.querySelector('#modal-root') as HTMLDivElement;

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
      className={`absolute left-0 top-0 z-10 h-screen w-screen bg-transparent ${contentClasses}`}
    >
      {children}
    </div>,
    modalRoot
  );
};

export default ModalWindow;
