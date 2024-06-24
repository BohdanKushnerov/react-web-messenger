import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import SvgIcon from '@components/common/SvgIcon/SvgIcon';

import useChatStore from '@zustand/store';

import handleDeleteMessage from '@utils/messages/handleDeleteMessage';

import { IDeleteButtonProps } from '@interfaces/IDeleteButtonProps';

import { IconId } from '@enums/iconsSpriteId';

const DeleteButton: FC<IDeleteButtonProps> = ({
  textContent = true,
  color,
}) => {
  const { t } = useTranslation();

  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const { chatUID, userUID } = useChatStore(state => state.currentChatInfo);
  const selectedDocDataMessage = useChatStore(
    state => state.selectedDocDataMessage
  );
  const resetSelectedMessages = useChatStore(
    state => state.resetSelectedMessages
  );

  return (
    <button
      className="flex w-full items-center justify-between px-8 py-2 text-white transition-all duration-150 hover:cursor-pointer hover:rounded-md hover:bg-darkZincOpacity90"
      type="button"
      onClick={() =>
        handleDeleteMessage(
          selectedDocDataMessage,
          chatUID,
          currentUserUID,
          userUID,
          t,
          resetSelectedMessages
        )
      }
      aria-label="Delete message"
    >
      <SvgIcon className={color} iconId={IconId.IconDeleteButton} size={20} />
      {textContent && (
        <span className="text-base">{t('ContextMenu.Delete')}</span>
      )}
    </button>
  );
};

export default DeleteButton;
