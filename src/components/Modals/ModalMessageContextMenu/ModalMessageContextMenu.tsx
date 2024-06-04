import { FC } from 'react';

import useChatStore from '@zustand/store';
import useCloseModal from '@hooks/useCloseModal';
import { IModalMessageContextMenuProps } from '@interfaces/IModalMessageContextMenuProps';

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
            top: modalPosition.top + 'px',
            left: modalPosition.left + 'px',
          }}
          className="z-10 w-screen h-screen bg-transparent pointer-events-none"
        >
          <div className="flex flex-col items-center w-[250px]">{children}</div>
        </div>
      )}
    </>
  );
};

export default MessageContextMenuModal;
