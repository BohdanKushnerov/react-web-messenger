import React from 'react'

import useCloseModal from '@hooks/useCloseModal';

interface IModalMessageContextMenu {
  closeModal: () => void;
  modalPosition: {
    top: number;
    left: number;
  };
  children: React.ReactNode;
}

const MessageContextMenuModal = ({
  closeModal,
  modalPosition,
  children,
}: IModalMessageContextMenu) => {
  useCloseModal(closeModal);

  return (
    <div
      style={{
        position: 'absolute',
        top: modalPosition.top + 'px',
        left: modalPosition.left + 'px',
      }}
      className="z-20 w-screen h-screen bg-transparent pointer-events-none"
    >
      {children}
    </div>
  );
}

export default MessageContextMenuModal;