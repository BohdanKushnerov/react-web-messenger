import type { FC } from 'react';

import useChatStore from '@store/store';

import useCloseModal from '@hooks/useCloseModal';

import type { IModalMessageContextMenuProps } from '@interfaces/IModalMessageContextMenuProps';

const MessageContextMenuModal: FC<IModalMessageContextMenuProps> = ({
  closeModal,
  modalPosition,
  children,
}) => {
  const isSelectedMessages = useChatStore(state => state.isSelectedMessages);
  const selectedDocDataMessage = useChatStore(
    state => state.selectedDocDataMessage
  );

  useCloseModal(closeModal);

  return (
    <>
      {!isSelectedMessages && selectedDocDataMessage && (
        <div
          style={{
            position: 'absolute',
            top: `${modalPosition.top}px`,
            left: `${modalPosition.left}px`,
          }}
          className="pointer-events-none z-10 h-screen w-screen bg-transparent"
        >
          <div className="flex w-250px flex-col items-center">{children}</div>
        </div>
      )}
    </>
  );
};

export default MessageContextMenuModal;
