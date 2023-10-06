import React from 'react';

import useCloseModal from '@hooks/useCloseModal';

interface IModalWindow {
  handleToggleModal: ()=>void;
  children: React.ReactNode;
}

function ModalWindow({ handleToggleModal, children }: IModalWindow) {
  useCloseModal(handleToggleModal);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(e);
    if (e.target === e.currentTarget) {
      handleToggleModal();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="absolute top-0 left-0 z-10 w-screen h-screen bg-transparent"
    >
      {children}
    </div>
  );
}

export default ModalWindow;
